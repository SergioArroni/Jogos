import type { Game } from './types';

// Box-art look per game: the first matching style picks the icon and gradient,
// and the name picks one of four background patterns, so covers stay stable.
export const TYPE_ART: [type: string, emoji: string, from: string, to: string][] = [
  ['Roles ocultos', '🕵️', '#2d2b55', '#6a45a8'],
  ['Cooperativo', '🤝', '#147a70', '#34b89a'],
  ['Dos jugadores', '⚔️', '#6b3192', '#bf55aa'],
  ['Fiesta', '🎉', '#d9465f', '#f19a48'],
  ['Estrategia', '🧠', '#2f4396', '#6a60d4'],
  ['Aventura', '🗺️', '#9c5a1b', '#dc9f36'],
  ['Cartas', '🃏', '#a32c3c', '#df6156'],
  ['Deducción', '🔍', '#234c76', '#4a8dc2'],
  ['Palabras', '🔤', '#0f6875', '#2eaebd'],
  ['Familiar', '🏡', '#357f42', '#86bb4c'],
  ['Humor', '😂', '#bf7710', '#ecbc38'],
  ['Dados', '🎲', '#853626', '#d6704b'],
];

export interface GameArt {
  emoji: string;
  from: string;
  to: string;
  pattern: 0 | 1 | 2 | 3;
}

export function gameArt(game: Pick<Game, 'name' | 'types'>): GameArt {
  const match = TYPE_ART.find(([type]) => (game.types ?? []).includes(type));
  let hash = 0;
  for (const char of game.name ?? '') hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return {
    emoji: match?.[1] ?? '🎲',
    from: match?.[2] ?? '#3d5a50',
    to: match?.[3] ?? '#78998a',
    pattern: (hash % 4) as GameArt['pattern'],
  };
}

export const typeEmoji = (type: string): string => TYPE_ART.find(([name]) => name === type)?.[1] ?? '';
