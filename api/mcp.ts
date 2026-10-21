// Vercel function /api/mcp (web-standard handlers: Request in, Response out).
import { allowedHosts, createBaulHandler } from '../mcp/server';
import { supabaseData } from '../mcp/supabase';

const handle = createBaulHandler({ allowedHosts: allowedHosts(), dataFor: token => supabaseData(token) });

export const GET = handle;
export const POST = handle;
export const DELETE = handle;
