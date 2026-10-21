const { createClient } = require('@supabase/supabase-js');
const handleCors = require('./_cors');
const { findAdmin, clientOptions } = require('./_admin');

function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(status).json(body);
}

module.exports = async function adminUsers(req, res) {
  if (handleCors(req, res)) return;
  if (req.method !== 'GET' && req.method !== 'PATCH') {
    res.setHeader('Allow', 'GET, PATCH');
    return send(res, 405, { error: 'Método no permitido.' });
  }

  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!secretKey) return send(res, 503, { error: 'Falta configurar el acceso seguro a Supabase en Vercel.' });

  try {
    const admin = await findAdmin(req);
    if (admin.error) return send(res, admin.status, { error: admin.error });
    const caller = admin.user;
    const adminClient = createClient(process.env.SUPABASE_URL, secretKey, clientOptions);

    if (req.method === 'GET') {
      const users = [];
      for (let page = 1; page <= 50; page += 1) {
        const { data, error } = await adminClient.auth.admin.listUsers({ page, perPage: 200 });
        if (error) throw error;
        users.push(...data.users);
        if (data.users.length < 200) break;
      }
      const ids = users.map(user => user.id);
      const { data: profiles, error: profileError } = ids.length
        ? await adminClient.from('profiles').select('user_id,nickname').in('user_id', ids)
        : { data: [], error: null };
      if (profileError) throw profileError;
      const nicknameById = new Map((profiles || []).map(profile => [profile.user_id, profile.nickname]));
      return send(res, 200, {
        users: users.map(user => ({
          id: user.id,
          email: user.email,
          nickname: nicknameById.get(user.id) || '',
          created_at: user.created_at,
          last_sign_in_at: user.last_sign_in_at,
          email_confirmed_at: user.email_confirmed_at,
          banned_until: user.banned_until,
        })),
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    if (!/^[0-9a-f-]{36}$/i.test(body.id || '') || !['suspend', 'restore'].includes(body.action)) {
      return send(res, 400, { error: 'Acción o usuario no válidos.' });
    }
    if (body.id === caller.id) return send(res, 400, { error: 'No puedes suspender tu propia cuenta.' });

    const { error } = await adminClient.auth.admin.updateUserById(body.id, {
      ban_duration: body.action === 'suspend' ? '876000h' : 'none',
    });
    if (error) throw error;
    return send(res, 200, { ok: true });
  } catch (error) {
    console.error('Admin user operation failed:', error.message);
    return send(res, 500, { error: 'No se pudo completar la operación. Revisa la configuración de Supabase.' });
  }
};
