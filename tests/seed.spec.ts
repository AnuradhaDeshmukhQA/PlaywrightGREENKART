import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // generate code here.
  });
});

//how to handle dialog
// page.on('dialog', async dialog => {
//   console.log(dialog.message());
//   await dialog.accept();
// });

// await page.click('#alertButton');