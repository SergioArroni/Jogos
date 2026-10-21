// Who may use the admin functions, decided in one place (api/admin-users.js and
// api/analytics.js both use it). Files starting with "_" are not deployed as functions.
const { createClient } = require('@supabase/supabase-js');

const ROOT_ADMIN_EMAIL = 'sergioadgi38@gmail.com';
const clientOptions = {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
};

/**
 * Checks the caller's Supabase session: only the root admin account with the
 * ludoteca_admin flag passes. Returns { user } or { status, error } to send back.
 * `deps` lets tests pass a fake Supabase client and environment.
 */
async function findAdmin(req, deps = {}) {
  const env = deps.env ?? process.env;
  const makeClient = deps.createClient ?? createClient;
  if (!env.SUPABASE_URL || !env.SUPABASE_PUBLISHABLE_KEY) {
    return { status: 503, error: 'Falta configurar el acceso seguro a Supabase en Vercel.' };
  }
  const token = (req.headers.authorization || '').match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return { status: 401, error: 'Inicia sesión para continuar.' };

  const { data, error } = await makeClient(env.SUPABASE_URL, env.SUPABASE_PUBLISHABLE_KEY, clientOptions).auth.getUser(token);
  const user = data?.user;
  if (error || !user) return { status: 401, error: 'La sesión ha caducado. Vuelve a iniciar sesión.' };
  if (user.email?.toLowerCase() !== ROOT_ADMIN_EMAIL || user.app_metadata?.ludoteca_admin !== true) {
    return { status: 403, error: 'Esta cuenta no tiene permiso de administración.' };
  }
  return { user };
}

module.exports = { findAdmin, clientOptions, ROOT_ADMIN_EMAIL };
