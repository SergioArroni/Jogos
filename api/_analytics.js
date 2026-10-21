// Reads Vercel Web Analytics for the admin page: the last 30 days (the Hobby
// plan's reporting window), production traffic only. `fetch` is passed in so
// tests can answer for Vercel without network.
const API = 'https://api.vercel.com/v1/query/web-analytics/visits/aggregate';
const DAY = 24 * 60 * 60 * 1000;

const isoDay = date => date.toISOString().slice(0, 10);

/** First and last day (YYYY-MM-DD, UTC) of the `days`-day window ending today. */
function dateRange(days, now = new Date()) {
  return { since: isoDay(new Date(now.getTime() - (days - 1) * DAY)), until: isoDay(now) };
}

/** One row per day in the window, with zeros for days without visits (so the chart has no gaps). */
function fillDays(rows, since, until) {
  const byDay = new Map(rows.map(row => [String(row.timestamp).slice(0, 10), row]));
  const days = [];
  for (let time = Date.parse(since); time <= Date.parse(until); time += DAY) {
    const day = isoDay(new Date(time));
    days.push({ day, pageviews: byDay.get(day)?.pageviews ?? 0, visitors: byDay.get(day)?.visitors ?? 0 });
  }
  return days;
}

const top = (rows, key) => rows.map(row => ({ name: row[key] || 'Desconocido', visitors: row.visitors ?? 0, pageviews: row.pageviews ?? 0 }));

function vercelError(status) {
  if (status === 401 || status === 403) return 'El token de Vercel no es válido o no tiene acceso al proyecto.';
  if (status === 402 || status === 404) return 'Web Analytics no está activado en el proyecto de Vercel.';
  if (status === 400) return 'Vercel rechazó la consulta de estadísticas.';
  return `Vercel no respondió bien (${status}).`;
}

async function loadAnalytics({ fetch, token, project, team, days = 30, now = new Date() }) {
  const { since, until } = dateRange(days, now);
  const query = async (by, limit) => {
    const params = new URLSearchParams({ projectId: project, slug: team, since, until, by });
    if (limit) params.set('limit', String(limit));
    const response = await fetch(`${API}?${params}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) throw new Error(vercelError(response.status));
    return (await response.json()).data ?? [];
  };
  // Grouping by environment (production only by default) gives the window's totals in one row.
  const [totals, daily, devices, countries, pages] = await Promise.all([
    query('environment'), query('day'), query('deviceType', 5), query('country', 5), query('requestPath', 5),
  ]);
  return {
    since,
    until,
    totals: { visitors: totals[0]?.visitors ?? 0, pageviews: totals[0]?.pageviews ?? 0 },
    days: fillDays(daily, since, until),
    devices: top(devices, 'deviceType'),
    countries: top(countries, 'country'),
    pages: top(pages, 'requestPath'),
  };
}

module.exports = { loadAnalytics, dateRange, fillDays };
