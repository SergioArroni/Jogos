// The Android app serves its pages from https://localhost, so the browser inside it
// asks permission (CORS) before calling these functions. Only the app is allowed;
// the website itself calls from the same origin and needs no extra headers.
// Files starting with "_" are not deployed as functions by Vercel.
const APP_ORIGINS = ['https://localhost', 'capacitor://localhost'];

/** Adds CORS headers for the app. Returns true when the request was a preflight that is already answered. */
module.exports = function handleCors(req, res) {
  const origin = req.headers.origin;
  if (APP_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }
  return false;
};
