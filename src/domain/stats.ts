import { nameKey } from './text';
import type { Play } from './types';

export interface GameStat {
  name: string;
  count: number;
  /** Sum and number of ratings, to compute the average. */
  sum: number;
  ratings: number;
  /** Most recent date it was played (plays arrive newest first). */
  last: string;
}

export interface WinnerStat {
  name: string;
  userId: string | null;
  count: number;
}

export interface PlayStats {
  games: Map<string, GameStat>;
  mostPlayed?: GameStat;
  winners: WinnerStat[];
  bestRated: (GameStat & { avg: number })[];
}

export const averageRating = (stat?: GameStat): number | null =>
  stat && stat.ratings ? stat.sum / stat.ratings : null;

/** Aggregates plays (newest first) into per-game counts, ratings and top winners. */
export function playStats(plays: Play[]): PlayStats {
  const games = new Map<string, GameStat>();
  const wins = new Map<string, WinnerStat>();
  for (const play of plays) {
    const key = nameKey(play.game_name);
    const entry = games.get(key) ?? { name: play.game_name.trim(), count: 0, sum: 0, ratings: 0, last: play.played_on };
    entry.count++;
    for (const player of play.play_players) {
      if (player.rating) {
        entry.sum += player.rating;
        entry.ratings++;
      }
      if (player.winner) {
        const who = player.user_id ?? 'n:' + nameKey(player.name);
        const winner = wins.get(who) ?? { name: player.name, userId: player.user_id, count: 0 };
        winner.count++;
        wins.set(who, winner);
      }
    }
    games.set(key, entry);
  }
  const all = [...games.values()];
  return {
    games,
    mostPlayed: [...all].sort((a, b) => b.count - a.count)[0],
    winners: [...wins.values()].sort((a, b) => b.count - a.count).slice(0, 3),
    bestRated: all
      .filter(game => game.ratings)
      .map(game => ({ ...game, avg: game.sum / game.ratings }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 3),
  };
}
