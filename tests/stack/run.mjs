// npm run test:integration → start the Docker backend (and the local MCP server if
// Rust is installed), run the integration tests, then stop everything.
// Set KEEP_STACK=1 to leave the containers running afterwards.
import { spawn, spawnSync } from 'node:child_process';
import { down, up } from './stack.mjs';

const MCP_URL = 'http://127.0.0.1:8791/mcp';

/** Builds and starts mcp/local.rs pointed at the test gateway; returns null when there is no Rust toolchain. */
async function startMcp() {
  const build = spawnSync('cargo', ['build', '--example', 'local'], { stdio: 'inherit', shell: true });
  if (build.status !== 0) {
    console.warn('Skipping the MCP tests: could not build the Rust server (is Rust installed?).');
    return null;
  }
  const binary = `target/debug/examples/local${process.platform === 'win32' ? '.exe' : ''}`;
  const server = spawn(binary, [], { stdio: 'inherit', env: { ...process.env, SUPABASE_URL: 'http://localhost:8790', SUPABASE_PUBLISHABLE_KEY: 'test' } });
  for (let i = 0; i < 50; i++) {
    try {
      await fetch(MCP_URL);
      return server;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  server.kill();
  throw new Error('The local MCP server did not start');
}

console.log('Starting Postgres + PostgREST and applying sql/ migrations…');
await up();
const mcp = await startMcp();
const result = spawnSync('npx', ['playwright', 'test', '--project=integration', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, ...(mcp ? { MCP_URL } : {}) },
});
mcp?.kill();
if (!process.env.KEEP_STACK) down();
process.exit(result.status ?? 1);
