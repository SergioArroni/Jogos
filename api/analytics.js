// GET /api/analytics → visit statistics for the admin page.
// The Vercel token only lives here, on the server: the browser never sees it.
const handleCors = require('./_cors');
const { findAdmin } = require('./_admin');
const { loadAnalytics } = require('./_analytics');

function send(res, status, body) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(status).json(body);
}

module.exports = async function analytics(req, res) {
  if (handleCors(req, res)) return;
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return send(res, 405, { error: 'Método no permitido.' });
  }
  try {
    const admin = await findAdmin(req);
    if (admin.error) return send(res, admin.status, { error: admin.error });
    const token = process.env.VERCEL_ANALYTICS_TOKEN;
    if (!token) return send(res, 503, { error: 'Falta la variable VERCEL_ANALYTICS_TOKEN en Vercel.' });
    const stats = await loadAnalytics({
      fetch,
      token,
      project: process.env.VERCEL_ANALYTICS_PROJECT || 'el-baul-de-los-jogos',
      team: process.env.VERCEL_ANALYTICS_TEAM || 'deus20',
    });
    return send(res, 200, stats);
  } catch (error) {
    console.error('Analytics failed:', error.message);
    return send(res, 502, { error: error.message || 'No se pudieron cargar las estadísticas.' });
  }
};
