import type { User } from '@supabase/supabase-js';
import { groupWithMembers } from '../domain/groups';
import { needsPlaceMigration, normalizeGamePlace, withDefaultPlaces } from '../domain/seed';
import { diffRows, snapshotOf, type Snapshot } from '../domain/sync';
import type { Group } from '../domain/types';
import { requireClient } from './client';
import type { Collection } from './local';

// Per-user tables store each item as JSON in `data`, keyed by `app_id` (the item's own id).
type Table = 'games' | 'groups' | 'places' | 'friends';
const TABLES: Table[] = ['games', 'groups', 'places', 'friends'];

export interface CloudLoad {
  collection: Collection;
  /** True when the account had nothing saved yet (the local copy should be uploaded). */
  empty: boolean;
  /** True when rows were fixed while loading (old place codes, missing default places). */
  migrated: boolean;
}

/**
 * Keeps track of what is in the cloud so saves only send the rows that changed.
 * Before sql/community-plays.sql adds `app_id` everywhere, it falls back to
 * replacing every row, like the original app did.
 */
export class CloudSync {
  private snapshot: Record<Table, Snapshot> | null = null;
  private rowIds = false;

  constructor(private readonly user: User) {}

  get ready(): boolean {
    return this.snapshot !== null;
  }

  async load(): Promise<CloudLoad> {
    const db = requireClient();
    const uid = this.user.id;
    const [games, groups, places, friends, sharedByEmail, sharedById, probe] = await Promise.all([
      db.from('games').select('data').eq('user_id', uid),
      db.from('groups').select('data').eq('user_id', uid),
      db.from('places').select('data').eq('user_id', uid),
      db.from('friends').select('data').eq('user_id', uid),
      db.from('group_shares').select('owner_id,group_key').ilike('member_email', this.user.email ?? ''),
      db.from('group_shares').select('owner_id,group_key').eq('member_id', uid),
      db.from('friends').select('app_id').limit(1),
    ]);
    for (const result of [games, groups, places, friends, sharedByEmail]) if (result.error) throw result.error;
    this.rowIds = !probe.error;

    const raw = {
      games: (games.data ?? []).map(row => row.data),
      groups: (groups.data ?? []).map(row => row.data),
      places: (places.data ?? []).map(row => row.data),
      friends: (friends.data ?? []).map(row => row.data),
    };
    this.snapshot = { games: snapshotOf(raw.games), groups: snapshotOf(raw.groups), places: snapshotOf(raw.places), friends: snapshotOf(raw.friends) };

    const empty = TABLES.every(table => raw[table].length === 0);
    const normalized = raw.games.map(normalizeGamePlace);
    const placesWithDefaults = withDefaultPlaces(raw.places);
    const migrated = !empty && (
      normalized.some((game, i) => needsPlaceMigration(raw.games[i], game)) || placesWithDefaults.length !== raw.places.length);

    const shares = [...(sharedByEmail.data ?? []), ...(sharedById.error ? [] : sharedById.data ?? [])];
    const shared = await loadSharedGroups(shares);
    return {
      collection: { games: normalized, groups: [...raw.groups, ...shared], places: placesWithDefaults, friends: raw.friends },
      empty,
      migrated,
    };
  }

  /** Saves the collection. Returns true when the friends list changed (so friend links need updating). */
  async save(collection: Collection): Promise<boolean> {
    const rows: Record<Table, { id: string }[]> = {
      games: collection.games,
      groups: collection.groups.filter(group => !group._shared).map(group => groupWithMembers(group, collection.friends)),
      places: collection.places,
      friends: collection.friends,
    };
    if (this.rowIds && this.snapshot) {
      const changes = await Promise.all(TABLES.map(table => this.saveChanges(table, rows[table])));
      return changes[TABLES.indexOf('friends')] > 0;
    }
    await Promise.all(TABLES.map(table => this.replace(table, rows[table])));
    this.snapshot = { games: snapshotOf(rows.games), groups: snapshotOf(rows.groups), places: snapshotOf(rows.places), friends: snapshotOf(rows.friends) };
    return true;
  }

  private async saveChanges(table: Table, rows: { id: string }[]): Promise<number> {
    const db = requireClient();
    const diff = diffRows(this.snapshot![table], rows);
    if (diff.removed.length) {
      const { error } = await db.from(table).delete().eq('user_id', this.user.id).in('app_id', diff.removed);
      if (error) throw error;
    }
    if (diff.changed.length) {
      const { error } = await db.from(table)
        .upsert(diff.changed.map(row => ({ user_id: this.user.id, app_id: row.id, data: row })), { onConflict: 'user_id,app_id' });
      if (error) throw error;
    }
    this.snapshot![table] = diff.current;
    return diff.removed.length + diff.changed.length;
  }

  private async replace(table: Table, rows: { id: string }[]): Promise<void> {
    const db = requireClient();
    const removed = await db.from(table).delete().eq('user_id', this.user.id);
    if (removed.error) throw removed.error;
    if (!rows.length) return;
    const withIds = table === 'groups' || this.rowIds;
    const { error } = await db.from(table)
      .insert(rows.map(row => ({ user_id: this.user.id, data: row, ...(withIds ? { app_id: row.id } : {}) })));
    if (error) throw error;
  }
}

async function loadSharedGroups(shares: { owner_id: string; group_key: string }[]): Promise<Group[]> {
  if (!shares.length) return [];
  const owners = [...new Set(shares.map(share => share.owner_id))];
  const { data, error } = await requireClient().from('groups').select('user_id,data').in('user_id', owners);
  if (error) throw error;
  const keys = new Set(shares.map(share => share.owner_id + ':' + share.group_key));
  return (data ?? [])
    .filter(row => keys.has(row.user_id + ':' + row.data.id))
    .map(row => ({ ...row.data, _shared: true, _ownerId: row.user_id }));
}
