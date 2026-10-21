import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LIBRARY, coverUrl, findInLibrary, libraryKey } from '../../src/content/library';
import { seedGames } from '../../src/domain/seed';

describe('game library', () => {
  it('has a drawn cover for every entry', () => {
    for (const entry of LIBRARY) expect(existsSync(`public${coverUrl(entry)}`), entry.slug).toBe(true);
  });

  it('never gives two games the same name', () => {
    const keys = LIBRARY.flatMap(entry => [...new Set(entry.names.map(libraryKey))]);
    expect(new Set(keys).size).toBe(keys.length);
    expect(new Set(LIBRARY.map(entry => entry.slug)).size).toBe(LIBRARY.length);
  });

  it('matches catalog names despite accents, case and notes in parentheses', () => {
    expect(findInLibrary("Time's Up! (dos versiones)")?.slug).toBe('times-up');
    expect(findInLibrary('¿Alguien ha probado este juego? (2 cajas)')?.slug).toBe('alguien-ha-probado');
    expect(findInLibrary('la ERA tramposa')?.slug).toBe('la-polilla-tramposa');
    expect(findInLibrary('Mision secreta')?.slug).toBe('mision-secreta');
    expect(findInLibrary('Catan')).toBeUndefined();
  });

  it('covers every one of the simplest starting games', () => {
    const missing = seedGames().filter(game => game.weight === 1 && !findInLibrary(game.name)).map(game => game.name);
    expect(missing).toEqual([]);
  });
});
