import { expect, test, type Page } from '@playwright/test';

// The admin page with a fake admin session and canned answers from /api/*,
// so it runs without touching Supabase or Vercel.
const days = Array.from({ length: 30 }, (_, i) => ({
  day: new Date(Date.UTC(2026, 8, 22 + i)).toISOString().slice(0, 10),
  visitors: i === 29 ? 6 : i % 3,
  pageviews: i === 29 ? 25 : (i % 3) * 4,
}));
const stats = {
  since: days[0].day,
  until: days[29].day,
  totals: { visitors: 18, pageviews: 140 },
  days,
  devices: [{ name: 'mobile', visitors: 12, pageviews: 100 }, { name: 'desktop', visitors: 6, pageviews: 40 }],
  countries: [{ name: 'ES', visitors: 17, pageviews: 138 }],
  pages: [{ name: '/', visitors: 18, pageviews: 120 }, { name: '/login.html', visitors: 5, pageviews: 20 }],
};

async function openAdmin(page: Page, analytics: { status: number; body: object }) {
  page.on('dialog', dialog => {
    throw new Error('Native dialog shown: ' + dialog.message());
  });
  await page.addInitScript(() => {
    const expires = Math.floor(Date.now() / 1000) + 3600;
    localStorage.setItem('sb-ibllpkczcsjxqzszwiby-auth-token', JSON.stringify({
      access_token: 'test', refresh_token: 'test', token_type: 'bearer', expires_in: 3600, expires_at: expires,
      user: { id: 'admin', email: 'sergioadgi38@gmail.com', app_metadata: { ludoteca_admin: true }, user_metadata: {} },
    }));
  });
  await page.route('**/api/admin-users', route => route.fulfill({ json: { users: [{ id: 'admin', email: 'sergioadgi38@gmail.com', nickname: 'sergio' }] } }));
  await page.route('**/api/analytics', route => route.fulfill({ status: analytics.status, json: analytics.body }));
  await page.goto('/admin.html');
}

test('shows visit totals, a bar per day and the top lists', async ({ page }) => {
  await openAdmin(page, { status: 200, body: stats });
  const tiles = page.locator('#visitTotals .stat-tile');
  await expect(tiles).toHaveText(['Visitantes18', 'Páginas vistas140', 'Media de visitantes al día1,1']);
  await expect(page.locator('.visits-bar')).toHaveCount(30);
  await expect(page.locator('#visitAxis')).toHaveText('22 sept21 oct');

  await page.locator('.visits-bar').last().hover();
  await expect(page.locator('#visitTip')).toHaveText('21 oct · 6 visitantes · 25 páginas');

  const tops = page.locator('#visitTops');
  await expect(tops).toContainText('Móvil12');
  await expect(tops).toContainText('España17');
  await expect(tops).toContainText('Inicio de sesión5');
  await expect(page.locator('#users')).toContainText('sergio');
});

test('explains why the statistics are not available', async ({ page }) => {
  await openAdmin(page, { status: 503, body: { error: 'Falta la variable VERCEL_ANALYTICS_TOKEN en Vercel.' } });
  await expect(page.locator('#analyticsStatus')).toHaveText('Falta la variable VERCEL_ANALYTICS_TOKEN en Vercel.');
  await expect(page.locator('#analytics')).toBeHidden();
});
