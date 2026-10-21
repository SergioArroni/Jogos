import { createRequire } from 'node:module';
import { describe, expect, it } from 'vitest';

// The Vercel functions are CommonJS; load them the way Node does.
const require = createRequire(import.meta.url);
const { findAdmin } = require('../../api/_admin.js');
const { dateRange, fillDays, loadAnalytics } = require('../../api/_analytics.js');

const env = { SUPABASE_URL: 'https://x.supabase.co', SUPABASE_PUBLISHABLE_KEY: 'pk' };
const request = (authorization?: string) => ({ headers: authorization ? { authorization } : {} });
/** A fake Supabase whose getUser returns the given user (or an error). */
const supabaseWith = (user: object | null) => () => ({
  auth: { getUser: async () => (user ? { data: { user }, error: null } : { data: {}, error: new Error('bad token') }) },
});
const ADMIN = { email: 'sergioadgi38@gmail.com', app_metadata: { ludoteca_admin: true } };

describe('findAdmin', () => {
  it('lets only the root admin account with the admin flag through', async () => {
    expect(await findAdmin(request('Bearer t'), { env, createClient: supabaseWith(ADMIN) })).toEqual({ user: ADMIN });
    expect((await findAdmin(request('Bearer t'), { env, createClient: supabaseWith({ ...ADMIN, app_metadata: {} }) })).status).toBe(403);
    expect((await findAdmin(request('Bearer t'), { env, createClient: supabaseWith({ email: 'otro@x.com', app_metadata: { ludoteca_admin: true } }) })).status).toBe(403);
  });
  it('asks to sign in without a valid session', async () => {
    expect((await findAdmin(request(), { env, createClient: supabaseWith(ADMIN) })).status).toBe(401);
    expect((await findAdmin(request('Bearer t'), { env, createClient: supabaseWith(null) })).status).toBe(401);
  });
  it('reports missing server configuration', async () => {
    expect((await findAdmin(request('Bearer t'), { env: {}, createClient: supabaseWith(ADMIN) })).status).toBe(503);
  });
});

describe('analytics', () => {
  it('covers the last 30 days including today', () => {
    expect(dateRange(30, new Date('2026-10-21T12:00:00Z'))).toEqual({ since: '2026-09-22', until: '2026-10-21' });
  });

  it('fills days without visits with zeros', () => {
    const days = fillDays([{ timestamp: '2026-10-20T00:00:00.000Z', pageviews: 7, visitors: 3 }], '2026-10-19', '2026-10-21');
    expect(days).toEqual([
      { day: '2026-10-19', pageviews: 0, visitors: 0 },
      { day: '2026-10-20', pageviews: 7, visitors: 3 },
      { day: '2026-10-21', pageviews: 0, visitors: 0 },
    ]);
  });

  it('asks Vercel for each breakdown and summarises the answers', async () => {
    const asked: URL[] = [];
    const answers: Record<string, object[]> = {
      environment: [{ environment: 'production', pageviews: 120, visitors: 15 }],
      day: [{ timestamp: '2026-10-21T00:00:00.000Z', pageviews: 20, visitors: 4 }],
      deviceType: [{ deviceType: 'mobile', pageviews: 90, visitors: 11 }, { deviceType: '', pageviews: 1, visitors: 1 }],
      country: [{ country: 'ES', pageviews: 118, visitors: 14 }],
      requestPath: [{ requestPath: '/', pageviews: 100, visitors: 15 }],
    };
    const fakeFetch = async (url: string, init: { headers: Record<string, string> }) => {
      const parsed = new URL(url);
      asked.push(parsed);
      expect(init.headers.Authorization).toBe('Bearer secret');
      return new Response(JSON.stringify({ data: answers[parsed.searchParams.get('by')!] }));
    };
    const stats = await loadAnalytics({ fetch: fakeFetch, token: 'secret', project: 'el-baul', team: 'deus20', days: 3, now: new Date('2026-10-21T08:00:00Z') });

    expect(asked.map(u => u.searchParams.get('by')).sort()).toEqual(['country', 'day', 'deviceType', 'environment', 'requestPath']);
    for (const url of asked) {
      expect(url.origin + url.pathname).toBe('https://api.vercel.com/v1/query/web-analytics/visits/aggregate');
      expect(url.searchParams.get('projectId')).toBe('el-baul');
      expect(url.searchParams.get('slug')).toBe('deus20');
      expect(url.searchParams.get('since')).toBe('2026-10-19');
    }
    expect(stats.totals).toEqual({ visitors: 15, pageviews: 120 });
    expect(stats.days.map((d: { visitors: number }) => d.visitors)).toEqual([0, 0, 4]);
    expect(stats.devices).toEqual([{ name: 'mobile', visitors: 11, pageviews: 90 }, { name: 'Desconocido', visitors: 1, pageviews: 1 }]);
    expect(stats.pages[0].name).toBe('/');
  });

  it('explains Vercel errors in plain words', async () => {
    const failing = (status: number) => async () => new Response('{}', { status });
    const load = (status: number) => loadAnalytics({ fetch: failing(status), token: 't', project: 'p', team: 't' });
    await expect(load(403)).rejects.toThrow('El token de Vercel no es válido');
    await expect(load(404)).rejects.toThrow('Web Analytics no está activado');
  });
});
