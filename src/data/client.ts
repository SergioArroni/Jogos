import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// The public Supabase settings live in /supabase-config.js (also used by the
// login and admin pages), so the same build can point at any project.
declare global {
  interface Window {
    LUDOTECA_SUPABASE?: { url?: string; publishableKey?: string; anonKey?: string };
  }
}

const config = window.LUDOTECA_SUPABASE ?? {};
const publicKey = config.publishableKey ?? config.anonKey;

export const supabase: SupabaseClient | null =
  config.url && publicKey && !publicKey.includes('TU_') ? createClient(config.url, publicKey) : null;

/** `?local=1` keeps everything in this browser without signing in. */
export const localMode = new URLSearchParams(location.search).get('local') === '1';

export const ADMIN_EMAIL = 'sergioadgi38@gmail.com';

export function requireClient(): SupabaseClient {
  if (!supabase) throw new Error('Supabase no está configurado.');
  return supabase;
}

export async function accessToken(): Promise<string> {
  const { data } = await requireClient().auth.getSession();
  if (!data.session) throw new Error('Inicia sesión para continuar.');
  return data.session.access_token;
}
