const { createClient } = require('@supabase/supabase-js');

const genericError = { error: 'No se pudo iniciar sesión. Comprueba el apodo y la contraseña.' };
const clientOptions = { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } };
const attempts = new Map();

function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(status).json(body);
}

module.exports = async function signInWithNickname(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Método no permitido.' });
  }
  const url = process.env.SUPABASE_URL;
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !publishableKey || !secretKey) return send(res, 503, { error: 'El acceso por apodo no está configurado en el servidor.' });

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const recent = (attempts.get(ip) || []).filter(time => now - time < 60_000);
  if (recent.length >= 12) return send(res, 429, { error: 'Demasiados intentos. Espera un minuto y vuelve a probar.' });
  recent.push(now);
  attempts.set(ip, recent);

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const nickname = String(body.nickname || '').trim();
    const password = String(body.password || '');
    if (!/^[A-Za-z0-9_.-]{3,24}$/.test(nickname) || !password) return send(res, 401, genericError);

    const adminClient = createClient(url, secretKey, clientOptions);
    const authClient = createClient(url, publishableKey, clientOptions);
    const pattern = nickname.replace(/[\\%_]/g, '\\$&');
    const { data: profile, error: profileError } = await adminClient
      .from('profiles').select('user_id').ilike('nickname', pattern).maybeSingle();
    if (profileError || !profile) return send(res, 401, genericError);

    const { data: authData, error: userError } = await adminClient.auth.admin.getUserById(profile.user_id);
    const email = authData?.user?.email;
    if (userError || !email) return send(res, 401, genericError);

    const { data, error } = await authClient.auth.signInWithPassword({ email, password });
    if (error || !data.session) return send(res, 401, genericError);
    return send(res, 200, { access_token: data.session.access_token, refresh_token: data.session.refresh_token });
  } catch (error) {
    console.error('Nickname sign-in failed:', error.message);
    return send(res, 500, { error: 'No se pudo iniciar sesión ahora. Vuelve a intentarlo.' });
  }
};
