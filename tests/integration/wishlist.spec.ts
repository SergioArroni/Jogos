import { expect, test } from '@playwright/test';
// @ts-expect-error plain JS helper shared with the Node scripts
import { resetData } from '../stack/stack.mjs';
import { go, openAs } from './helpers';

test.beforeAll(() => resetData());

test('a game can be proposed without a link and says how keen you are', async ({ browser }) => {
  const page = await openAs(browser, 'a');
  await go(page, 'Por comprar');

  await page.getByRole('button', { name: 'Proponer juego' }).click();
  await page.getByLabel('Nombre del juego *').fill('Cascadia');
  await page.getByLabel('Descripción *').fill('Losetas y animales, muy tranquilo.');
  await page.getByRole('button', { name: 'Añadir a la lista' }).click();
  await expect(page.getByText('Elige tus ganas de jogo.')).toBeVisible();

  await page.getByLabel('Ganas de jogo *').selectOption({ label: 'Yo le daba' });
  await page.getByRole('button', { name: 'Añadir a la lista' }).click();

  const card = page.locator('.card', { hasText: 'Cascadia' });
  await expect(card).toContainText('Ganas: Yo le daba');
  await expect(card.getByRole('link', { name: 'Ver ficha / tienda' })).toHaveCount(0);
});
