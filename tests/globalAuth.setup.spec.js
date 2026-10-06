import { mkdir } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

test('Generate auth.json', async ({ page }) => {
  const email = process.env.GREENKART_EMAIL;
  const password = process.env.GREENKART_PASSWORD;
  test.skip(!email || !password, 'Set GREENKART_EMAIL and GREENKART_PASSWORD to generate auth state.');

  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill(password);
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.waitForURL(/dashboard/);

  await mkdir('.auth', { recursive: true });
  await page.context().storageState({ path: '.auth/auth.json' });
});