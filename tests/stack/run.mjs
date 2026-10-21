// npm run test:integration → start the Docker backend, run the integration tests, stop it.
// Set KEEP_STACK=1 to leave the containers running afterwards.
import { spawnSync } from 'node:child_process';
import { down, up } from './stack.mjs';

console.log('Starting Postgres + PostgREST and applying sql/ migrations…');
await up();
const result = spawnSync('npx', ['playwright', 'test', '--project=integration', ...process.argv.slice(2)], { stdio: 'inherit', shell: true });
if (!process.env.KEEP_STACK) down();
process.exit(result.status ?? 1);
