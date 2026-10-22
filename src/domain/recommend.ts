import { playerRange, supports } from './players';
import { averageRating, type GameStat } from './stats';
import { formatDecimal, nameKey } from './text';
import type { Game, Group } from './types';

export interface RecommendOptions {
  players: number;
  group?: Group;
  mood: string;
  weight: number;
  duration: number;
  place: string;
  /** Stats of the selected group's plays, keyed by game name. */
  groupGames?: Map<string, GameStat>;
}

export interface Recommendation {
  game: Game;
  score: number;
  /** Short note about the game's history with the selected group. */
  groupNote: string;
}

/** Scores every game for the plan and returns the best eight. */
export function recommend(games: Game[], options: RecommendOptions): Recommendation[] {
  const { players, group, mood, weight, duration, place, groupGames = new Map() } = options;
  const likes = group ? (group.likes ?? '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean) : [];
  return games
    .map(game => {
      let score = 0;
      const played = groupGames.get(nameKey(game.name));
      const avg = averageRating(played);
      if (avg != null) score += (avg - 5) / 1.5;
      else if (group && !played) score += 1;
      if (supports(game, players)) score += 3;
      else if (playerRange(game.players).length) score -= 8;
      if (mood && game.types.includes(mood)) score += 5;
      if (weight && game.weight) score += Math.max(0, 4 - Math.abs(game.weight - weight));
      if (duration && game.duration) score += game.duration <= duration ? 2 : -3;
      if (place && !game.locations.includes(place)) score -= 20;
      if (likes.length && game.types.some(type => likes.includes(type.toLowerCase()))) score += 3;
      const groupNote = !group ? ''
        : avg != null ? `Nota del grupo: ${formatDecimal(avg)}/10`
        : played ? `Jugado ${played.count} ${played.count === 1 ? 'vez' : 'veces'} con el grupo`
        : 'Sin estrenar con el grupo';
      return { game, score, groupNote };
    })
    .filter(item => item.score > -2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}
