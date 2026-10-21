import type { Game } from './types';

/** Numbers in a players text such as "3–10" or "2–?" → [3, 10] or [2]. */
export function playerRange(players: string | null | undefined): number[] {
  const numbers = String(players ?? '').match(/\d+/g);
  return numbers ? numbers.map(Number) : [];
}

export function maxPlayers(game: Pick<Game, 'players'>): number {
  const range = playerRange(game.players);
  return range.length ? range[range.length - 1] : 0;
}

/** Whether a game works for exactly `count` people (0 means "any"). */
export function supports(game: Pick<Game, 'players'>, count: number): boolean {
  if (!count) return true;
  const range = playerRange(game.players);
  if (!range.length) return false;
  const min = range[0];
  const max = range.length > 1 ? range[range.length - 1] : min;
  return count >= min && count <= max;
}
