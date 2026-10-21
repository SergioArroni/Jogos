// Game library: what is the same for everyone who owns a game (its cover art and
// how to play it), as opposed to each person's copy (place, notes) stored in Supabase.
// Entries are matched to games by name, so friends' catalogs get them too.

import { HEAVY } from './games-heavy';
import { LIGHT } from './games-light';
import { MEDIUM } from './games-medium';

export interface HowToPlay {
  goal: string;
  setup?: string;
  turn: string[];
  end: string;
  tip?: string;
  /** Shown when the summary is only the general idea, or the exact edition is uncertain. */
  caveat?: string;
}

export interface LibraryEntry {
  slug: string;
  /** Names it may have in a catalog (box name, Spanish name, common spelling). */
  names: string[];
  /** Missing when no reliable rules were found: better nothing than made-up rules. */
  rules?: HowToPlay;
}

/** Name key that ignores case, accents, punctuation and anything in parentheses. */
export function libraryKey(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9ñ]+/g, ' ')
    .trim();
}

export const coverUrl = (entry: LibraryEntry): string => `/covers/${entry.slug}.svg`;

// Ordered from the simplest games to the most complex, like the catalog's difficulty.
export const LIBRARY: LibraryEntry[] = [...LIGHT, ...MEDIUM, ...HEAVY];

const index = new Map(LIBRARY.flatMap(entry => entry.names.map(name => [libraryKey(name), entry] as const)));

export const findInLibrary = (gameName: string): LibraryEntry | undefined => index.get(libraryKey(gameName));
