// Stands in for Supabase + Vercel during integration tests: serves the built app
// from dist/, forwards /rest/v1 to PostgREST and answers the few auth/storage/api
// calls the app makes. Only for tests — it does no real authentication.
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { anonKey, REST_PORT } from './stack.mjs';

const PORT = 8790;
const DIST = fileURLToPath(new URL('../../dist/', import.meta.url));
const REST = `http://localhost:${REST_PORT}`;
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript' };
const claimsOf = header => {
  try {
    return JSON.parse(Buffer.from((header ?? '').replace(/^Bearer /, '').split('.')[1], 'base64url'));
  } catch {
    return null;
  }
};
const json = (res, status, body) => {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
};

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const body = await new Promise(resolve => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
  });

  if (url.pathname === '/supabase-config.js') {
    res.writeHead(200, { 'content-type': 'application/javascript' });
    return res.end(`window.LUDOTECA_SUPABASE={url:"http://localhost:${PORT}",publishableKey:"${anonKey()}"};`);
  }
  if (url.pathname.startsWith('/rest/v1/')) {
    const headers = { ...req.headers };
    delete headers.host;
    delete headers.apikey;
    headers.authorization ??= 'Bearer ' + anonKey();
    const upstream = await fetch(REST + url.pathname.slice(8) + url.search, {
      method: req.method, headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : body,
    });
    const skip = ['content-encoding', 'transfer-encoding', 'content-length'];
    res.writeHead(upstream.status, Object.fromEntries([...upstream.headers].filter(([key]) => !skip.includes(key))));
    return res.end(Buffer.from(await upstream.arrayBuffer()));
  }
  if (url.pathname.startsWith('/auth/v1/')) {
    const claims = claimsOf(req.headers.authorization);
    return json(res, 200, claims ? { id: claims.sub, email: claims.email } : {});
  }
  if (url.pathname.startsWith('/storage/v1/')) return json(res, 400, { error: 'Storage is not available in tests' });
  if (url.pathname === '/api/friend-lookup') {
    // Same answer shape as api/friend-lookup.js, using the caller's token to read profiles.
    const claims = claimsOf(req.headers.authorization);
    const queries = JSON.parse(body.toString() || '{}').queries ?? [];
    const profiles = await (await fetch(`${REST}/profiles?select=user_id,nickname,created_at`, { headers: { authorization: req.headers.authorization } })).json();
    return json(res, 200, {
      results: queries.map(raw => {
        const query = raw.toLowerCase();
        const match = profiles.find(p => p.nickname.toLowerCase() === query);
        return match
          ? { query, found: true, userId: match.user_id, nickname: match.nickname, createdAt: match.created_at, self: match.user_id === claims?.sub }
          : { query, found: false };
      }),
    });
  }

  const file = normalize(join(DIST, url.pathname === '/' ? 'index.html' : url.pathname));
  if (file.startsWith(normalize(DIST)) && existsSync(file) && statSync(file).isFile()) {
    res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    return res.end(readFileSync(file));
  }
  res.writeHead(404);
  res.end('not found');
}).listen(PORT, () => console.log(`Test gateway on http://localhost:${PORT}`));
