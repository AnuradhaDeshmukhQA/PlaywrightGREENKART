import { test, expect } from '@playwright/test';
const baseURL= 'https://rahulshettyacademy.com/seleniumPractise/#/'

test.describe('GreenKart application  @negativeSce @regression', () => {

    test('Add to cart product for GreenKart @regression', async ({ page }) => {
      await page.goto(baseURL);
      // Use placeholder (stable) instead of role name text
      const search = page.getByPlaceholder('Search for Vegetables and Fruits');
      await search.fill('@#$%%%'); // Cauliflower     
     // Wait for empty state (optional but robust)
      await expect(page.getByText('Sorry, no products matched your search!', { exact: false })).toBeVisible();
     // Count only visible product cards inside the grid
      const products = page.locator('.products .product:visible');
      // Get the number and print it
      const count = await products.count();
      console.log('Visible product count:', count);
      await expect(products).toHaveCount(0);
    
    });


   test.only('Search with extremely long input should not crash and show no results', async ({ page }) => {
    await page.goto(baseURL);
    // Create a long string (~600 chars)
    const longInput = 'x'.repeat(600);
    await page.getByPlaceholder('Search for Vegetables and Fruits').fill(longInput);
    // Page should remain responsive
    await expect(page).toHaveTitle(/GREENKART/i);
    // No products expected
    const products = page.locator('.products .product');
    await expect(products).toHaveCount(0);
  });

  
  test('quantity must not go below 1 @system', async ({ page }) => {
  await page.goto(baseURL);
  const card = page.locator('.product').filter({ hasText: 'Brocolli' }); // pick any visible item
  await expect(card).toBeVisible();
  const dec = card.locator('a.decrement');
  const qty = card.locator('input.quantity');
  await dec.click();
  await dec.click();
  await dec.click();
  const val = Number(await qty.inputValue());
  console.log('Quantity value:', val);
  expect(val).toBe(1);
});
})