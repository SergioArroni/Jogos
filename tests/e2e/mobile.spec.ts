import { expect, test } from '@playwright/test';

test('mobile layout has no sideways scroll and opens the game sheet', async ({ page }) => {
  await page.goto('/?local=1');
  await expect(page.getByRole('heading', { name: 'Tu colección' })).toBeVisible();
  for (const tab of ['Catálogo', 'Qué jugamos', 'Partidas', 'Comunidad', 'Por comprar']) {
    await page.getByRole('navigation').getByRole('button', { name: tab }).click();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `sideways scroll on ${tab}`).toBeLessThanOrEqual(0);
  }
  await page.getByRole('navigation').getByRole('button', { name: 'Catálogo' }).click();
  await page.locator('.cover-grid .cover').first().click();
  await expect(page.getByRole('dialog').getByRole('button', { name: 'Editar' })).toBeVisible();
});
