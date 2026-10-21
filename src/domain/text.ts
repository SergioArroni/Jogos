// Small text and date helpers shared by every screen.

/** Case- and space-insensitive key used to compare game and friend names. */
export const nameKey = (name: string | null | undefined): string =>
  String(name ?? '').trim().toLocaleLowerCase('es');

export const NICKNAME_PATTERN = /^[A-Za-z0-9_.-]{3,24}$/;

export const isValidNickname = (value: string): boolean => NICKNAME_PATTERN.test(value);

/** Turns any name into a nickname the sign-up form accepts, e.g. "Tío Juan" → "tio_juan". */
export function nicknameSuggestion(name: string): string {
  const slug = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_.-]/g, '')
    .slice(0, 24);
  return slug.length < 3 ? (slug || 'amigo') + '_jogos' : slug;
}

/** Adds a short random suffix when the suggested nickname is already taken. */
export const withSuffix = (nickname: string, random = Math.random()): string =>
  nickname.slice(0, 20) + '_' + Math.floor(100 + random * 900);

export const formatDate = (day: string): string =>
  new Date(day + 'T00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });

export const formatShortDate = (day: string): string =>
  new Date(day + 'T00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

export const formatDecimal = (value: number): string =>
  value.toLocaleString('es-ES', { maximumFractionDigits: 1 });

/** Today's date in the device's time zone, as YYYY-MM-DD. */
export function localToday(now = new Date()): string {
  return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function safeHttpUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
  } catch {
    return '';
  }
}

export const plural = (count: number, one: string, many: string): string =>
  `${count} ${count === 1 ? one : many}`;
