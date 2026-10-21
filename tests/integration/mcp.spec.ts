import { expect, test, type APIRequestContext } from '@playwright/test';
// @ts-expect-error plain JS helper shared with the Node scripts
import { resetData, sign, sql, USERS } from '../stack/stack.mjs';

// Talks MCP to the Rust server (mcp/local.rs) the way Claude or ChatGPT would.
// tests/stack/run.mjs starts it against the Docker backend and sets MCP_URL.
const MCP_URL = process.env.MCP_URL;
test.skip(!MCP_URL, 'The local MCP server is not running (needs Rust installed)');

type Who = 'a' | 'b';
const token = (who: Who) => {
  const user = (USERS as Record<Who, { id: string; email: string }>)[who];
  return sign({ sub: user.id, email: user.email, role: 'authenticated', aud: 'authenticated' });
};

let nextId = 0;
async function rpc(request: APIRequestContext, method: string, params: object, who: Who | null = 'a') {
  const response = await request.post(MCP_URL!, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json, text/event-stream',
      'MCP-Protocol-Version': '2025-06-18',
      ...(who ? { Authorization: 'Bearer ' + token(who) } : {}),
    },
    data: { jsonrpc: '2.0', id: ++nextId, method, params },
  });
  return { status: response.status(), body: await response.json() };
}
const toolText = async (request: APIRequestContext, name: string, args: object, who: Who = 'a') =>
  (await rpc(request, 'tools/call', { name, arguments: args }, who)).body.result.content[0].text as string;

test.beforeAll(() => {
  resetData();
  const game = (owner: string, id: string, data: object) => `('${owner}','${id}','${JSON.stringify({ id, ...data })}')`;
  sql(`insert into public.games(user_id, app_id, data) values
    ${game(USERS.a.id, 'g1', { name: 'Catan', players: '3–4', types: ['Estrategia'], weight: 2, duration: 90, location: 'Casa Sergio' })},
    ${game(USERS.a.id, 'g2', { name: 'Magic Maze', players: '1–8', types: ['Cooperativo'] })},
    ${game(USERS.b.id, 'g3', { name: 'Juego secreto de B' })};`, { admin: true });
});

test('introduces itself and lists its tools', async ({ request }) => {
  const init = await rpc(request, 'initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'test', version: '1' } });
  expect(init.status).toBe(200);
  expect(init.body.result.serverInfo.name).toBe('el-baul-de-los-jogos');
  const list = await rpc(request, 'tools/list', {});
  expect(list.body.result.tools.map((t: { name: string }) => t.name).sort()).toEqual(['list_games', 'who_am_i']);
});

test('answers as the signed-in person', async ({ request }) => {
  expect(await toolText(request, 'who_am_i', {})).toBe('Conectado como @usuario_a (a@x.com).');
});

test('lists only the caller’s games, thanks to RLS', async ({ request }) => {
  const mine = await toolText(request, 'list_games', {});
  expect(mine).toContain('2 juegos:');
  expect(mine).toContain('- Catan (3–4 jugadores; 90 min; dureza 2/5; Estrategia; en Casa Sergio)');
  expect(mine).not.toContain('secreto');
  expect(await toolText(request, 'list_games', { search: 'cooperativo' })).toBe('1 juego:\n- Magic Maze (1–8 jugadores; Cooperativo)');
  expect(await toolText(request, 'list_games', {}, 'b')).toBe('1 juego:\n- Juego secreto de B');
});

test('asks to sign in when there is no token', async ({ request }) => {
  const response = await rpc(request, 'tools/list', {}, null);
  expect(response.status).toBe(401);
});
