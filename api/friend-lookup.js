const { createClient } = require('@supabase/supabase-js');

const clientOptions = {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
};
const attempts = new Map();

function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(status).json(body);
}

// Resolves nicknames or emails to app accounts so a friend can be linked to a real user.
module.exports = async function friendLookup(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Método no permitido.' });
  }

  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !publishableKey || !secretKey) {
    return send(res, 503, { error: 'La búsqueda de cuentas no está configurada en el servidor.' });
  }

  const token = (req.headers.authorization || '').match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return send(res, 401, { error: 'Inicia sesión para continuar.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const queries = [...new Set((Array.isArray(body.queries) ? body.queries : [])
      .map(query => String(query || '').trim().toLowerCase())
      .filter(Boolean))].slice(0, 50);
    if (!queries.length) return send(res, 400, { error: 'Indica un apodo o un correo.' });

    const authClient = createClient(url, publishableKey, clientOptions);
    const adminClient = createClient(url, secretKey, clientOptions);
    const { data: authData, error: authError } = await authClient.auth.getUser(token);
    const caller = authData?.user;
    if (authError || !caller) return send(res, 401, { error: 'La sesión ha caducado. Vuelve a iniciar sesión.' });

    const now = Date.now();
    const recent = (attempts.get(caller.id) || []).filter(time => now - time < 60_000);
    if (recent.length >= 20) return send(res, 429, { error: 'Demasiadas búsquedas. Espera un minuto.' });
    recent.push(now);
    attempts.set(caller.id, recent);

    const emails = queries.filter(query => query.includes('@'));
    const nicknames = queries.filter(query => !query.includes('@') && /^[a-z0-9_.-]{3,24}$/.test(query));
    const idByQuery = new Map();

    if (emails.length) {
      const wanted = new Set(emails);
      for (let page = 1; page <= 50 && idByQuery.size < wanted.size; page += 1) {
        const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 200 });
        if (error) throw error;
        for (const user of data.users) {
          const email = user.email?.toLowerCase();
          if (email && wanted.has(email)) idByQuery.set(email, user.id);
        }
        if (data.users.length < 200) break;
      }
    }

    const { data: profiles, error: profileError } = await adminClient
      .from('profiles').select('user_id,nickname,created_at');
    if (profileError) throw profileError;
    const profileById = new Map(profiles.map(profile => [profile.user_id, profile]));
    for (const nickname of nicknames) {
      const profile = profiles.find(item => item.nickname.toLowerCase() === nickname);
      if (profile) idByQuery.set(nickname, profile.user_id);
    }

    return send(res, 200, {
      results: queries.map(query => {
        const userId = idByQuery.get(query);
        const profile = userId && profileById.get(userId);
        return profile
          ? { query, found: true, userId, nickname: profile.nickname, createdAt: profile.created_at, self: userId === caller.id }
          : { query, found: false };
      }),
    });
  } catch (error) {
    console.error('Friend lookup failed:', error.message);
    return send(res, 500, { error: 'No se pudo comprobar la cuenta. Vuelve a intentarlo.' });
  }
};
