import type { Friend, Group, GroupMember, Play } from './types';

/** Groups are identified across accounts by "<owner id>:<group id>". */
export const groupKey = (group: Group, currentUserId: string): string =>
  (group._ownerId ?? currentUserId) + ':' + group.id;

export const playGroupKey = (play: Pick<Play, 'group_owner' | 'group_key'>): string =>
  play.group_key ? play.group_owner + ':' + play.group_key : '';

export function splitGroupKey(key: string): { owner: string; id: string } | null {
  const at = key.indexOf(':');
  return at > 0 ? { owner: key.slice(0, at), id: key.slice(at + 1) } : null;
}

/** Members of a group: from the owner's friends, or the saved snapshot for shared groups. */
export function groupMembers(group: Group, friends: Friend[]): GroupMember[] {
  if (group._shared) return group.members ?? [];
  return (group.friendIds ?? [])
    .map(id => friends.find(friend => friend.id === id))
    .filter((friend): friend is Friend => !!friend)
    .map(friend => ({ name: friend.name, userId: friend.userId ?? null }));
}

/** The group as it is stored, with a members snapshot for the people it is shared with. */
export const groupWithMembers = (group: Group, friends: Friend[]): Group => ({
  ...group,
  members: groupMembers({ ...group, _shared: false }, friends),
});
