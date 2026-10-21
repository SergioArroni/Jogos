import type { FriendRequest, Person } from '../domain/types';
import { accessToken, requireClient } from './client';

/** Nicknames and signed avatar URLs for the given accounts. */
export async function loadPeople(ids: string[]): Promise<Map<string, Person>> {
  const db = requireClient();
  const people = new Map<string, Person>();
  if (!ids.length) return people;
  let result = await db.from('profiles').select('user_id,nickname,avatar_path').in('user_id', ids);
  // Before profile photos were enabled the column does not exist yet.
  if (result.error) result = await db.from('profiles').select('user_id,nickname').in('user_id', ids) as typeof result;
  if (result.error) throw result.error;
  const paths = result.data.map(profile => profile.avatar_path).filter(Boolean) as string[];
  let urls = new Map<string, string>();
  if (paths.length) {
    const { data, error } = await db.storage.from('avatars').createSignedUrls(paths, 3600);
    if (!error) for (const item of data) if (item.path && item.signedUrl) urls.set(item.path, item.signedUrl);
  }
  for (const profile of result.data)
    people.set(profile.user_id, { nickname: profile.nickname, avatarUrl: urls.get(profile.avatar_path) ?? '' });
  return people;
}

export interface LookupResult {
  query: string;
  found: boolean;
  userId?: string;
  nickname?: string;
  createdAt?: string;
  self?: boolean;
}

/** Finds app accounts by nickname (or legacy email) through the server, which can see every profile. */
export async function lookupAccounts(queries: string[]): Promise<LookupResult[]> {
  const response = await fetch('/api/friend-lookup', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + (await accessToken()), 'Content-Type': 'application/json' },
    body: JSON.stringify({ queries }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error ?? 'No se pudo comprobar la cuenta.');
  return body.results;
}

/** Tells linked friends "X te ha añadido": one friend_links row per linked friend. */
export async function syncFriendLinks(ownerId: string, friendIds: string[]): Promise<void> {
  const db = requireClient();
  const ids = [...new Set(friendIds.filter(id => id && id !== ownerId))];
  if (ids.length) {
    const { error } = await db.from('friend_links')
      .upsert(ids.map(friend_id => ({ owner_id: ownerId, friend_id })), { onConflict: 'owner_id,friend_id', ignoreDuplicates: true });
    if (error) throw error;
  }
  let stale = db.from('friend_links').delete().eq('owner_id', ownerId);
  if (ids.length) stale = stale.not('friend_id', 'in', `(${ids.join(',')})`);
  const { error } = await stale;
  if (error) throw error;
}

export async function loadFriendRequests(userId: string): Promise<FriendRequest[]> {
  const { data, error } = await requireClient().from('friend_links')
    .select('owner_id').eq('friend_id', userId).eq('dismissed', false);
  return error ? [] : data;
}

export async function dismissFriendRequest(ownerId: string, userId: string): Promise<void> {
  const { error } = await requireClient().from('friend_links')
    .update({ dismissed: true }).eq('owner_id', ownerId).eq('friend_id', userId);
  if (error) throw error;
}

export interface GroupShare {
  id: number;
  member_id: string | null;
  member_email: string | null;
}

export async function loadGroupShares(ownerId: string, groupId: string): Promise<GroupShare[]> {
  const { data, error } = await requireClient().from('group_shares')
    .select('id,member_id,member_email').eq('owner_id', ownerId).eq('group_key', groupId);
  if (error) {
    throw new Error(/member_id/.test(error.message)
      ? 'Para compartir con tus amigos, ejecuta sql/community-plays.sql en Supabase.'
      : 'No se pudo cargar: ' + error.message);
  }
  return data;
}

export async function updateGroupShares(ownerId: string, groupId: string, add: string[], remove: number[]): Promise<void> {
  const db = requireClient();
  if (add.length) {
    const { error } = await db.from('group_shares').insert(add.map(member_id => ({ owner_id: ownerId, group_key: groupId, member_id })));
    if (error) throw error;
  }
  if (remove.length) {
    const { error } = await db.from('group_shares').delete().in('id', remove);
    if (error) throw error;
  }
}
