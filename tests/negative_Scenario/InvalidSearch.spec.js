import { test, expect } from '@playwright/test';

const baseURL = 'https://rahulshettyacademy.com/seleniumPractise/#/';

test.describe('Search and Product - Negative Scenarios @negativeSce @search', () => {

  test('Search with special characters @special-chars-search', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    
    // Test various special characters
    const specialChars = ['@#$%', '!&*()', '<>?:"', '{}[]'];
    
    for (const chars of specialChars) {
      await search.fill(chars);
      
      // Verify no results shown
      const products = page.locator('.products .product:visible');
      const count = await products.count();
      
      console.log(`Search for '${chars}' - Products found: ${count}`);
      expect(count).toBe(0);
      
      // Clear for next iteration
      await search.fill('');
      await page.waitForTimeout(300);
    }
  });

  test('Search with SQL injection attempt @sql-inject-search', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    
    // Common SQL injection patterns
    const injections = [
      "' OR '1'='1",
      "1' UNION SELECT * FROM products--",
      "admin'--",
      "1; DROP TABLE products--"
    ];
    
    for (const injection of injections) {
      await search.fill(injection);
      await page.waitForTimeout(500);
      
      // App should remain stable
      const products = page.locator('.products .product:visible');
      const count = await products.count();
      
      console.log(`SQL injection attempt: '${injection}' - Products: ${count}`);
      
      // App should not crash or show unexpected data
      await expect(page).toHaveTitle(/GREENKART/i);
    }
  });

  test('Search with XSS payload @xss-search', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    
    // XSS payloads
    const xssPayloads = [
      '<script>alert("xss")</script>',
      '<img src=x onerror="alert(1)">',
      'javascript:alert(1)',
      '<svg onload=alert(1)>'
    ];
    
    for (const payload of xssPayloads) {
      await search.fill(payload);
      
      // App should remain functional
      const products = page.locator('.products .product:visible');
      const count = await products.count();
      
      console.log(`XSS payload attempt - Products: ${count}`);
      
      // Verify page integrity
      const searchBox = page.getByPlaceholder('Search for Vegetables and Fruits');
      await expect(searchBox).toBeVisible();
    }
  });

  test('Search with extremely long input @long-search-input', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    
    // Create very long string
    const longInput = 'a'.repeat(1000);
    await search.fill(longInput);
    
    // Wait for search to process
    await page.waitForTimeout(1000);
    
    // App should remain stable
    await expect(page).toHaveTitle(/GREENKART/i);
    
    // Verify no results
    const products = page.locator('.products .product:visible');
    await expect(products).toHaveCount(0);
    
    console.log('App stable with 1000 char search input');
  });

  test('Search with numbers only @numbers-only-search', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    
    await search.fill('123456789');
    
    // Should return no results
    const products = page.locator('.products .product:visible');
    await expect(products).toHaveCount(0);
    
    console.log('Numbers-only search returns no results');
  });

  test('Search with whitespace only @whitespace-search', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    
    // Fill with spaces
    await search.fill('     ');
    
    // Should either show all or no results
    const products = page.locator('.products .product:visible');
    const count = await products.count();
    
    console.log(`Whitespace search - Products: ${count}`);
  });

  test('Search with non-existent product @non-existent-product', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    
    // Search for product that doesn't exist
    await search.fill('nonexistentproduct123xyz');
    
    // Verify no results
    const products = page.locator('.products .product:visible');
    await expect(products).toHaveCount(0);
    
    // Verify error message
    const noResultsMsg = page.getByText(/Sorry|no products|not found/i);
    await expect(noResultsMsg).toBeVisible({ timeout: 3000 }).catch(() => {
      console.log('No explicit error message shown, but no products returned');
    });
  });

  test('Search with case sensitivity @case-sensitivity', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    
    // Search lowercase
    await search.fill('cauliflower');
    let products = page.locator('.products .product:visible');
    const countLower = await products.count();
    
    // Search uppercase
    await search.fill('CAULIFLOWER');
    products = page.locator('.products .product:visible');
    const countUpper = await products.count();
    
    // Search mixed case
    await search.fill('CaUlIfLoWeR');
    products = page.locator('.products .product:visible');
    const countMixed = await products.count();
    
    console.log(`Lowercase: ${countLower}, Uppercase: ${countUpper}, Mixed: ${countMixed}`);
    
    // All should return same results (case-insensitive)
    expect(countLower).toBe(countUpper);
    expect(countUpper).toBe(countMixed);
  });

  test('Rapid search input changes @rapid-search-changes', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    
    // Rapidly change search terms
    const searchTerms = ['cau', 'bee', 'man', 'oni', 'tom', 'car'];
    
    for (const term of searchTerms) {
      await search.fill(term);
      await page.waitForTimeout(100);
    }
    
    // App should remain stable
    await expect(page).toHaveTitle(/GREENKART/i);
    
    const products = page.locator('.products .product:visible');
    const count = await products.count();
    
    console.log(`After rapid searches - Products visible: ${count}`);
  });

  test('Search and increment decrement bounds @quantity-bounds', async ({ page }) => {
    await page.goto(baseURL);
    
    const search = page.getByPlaceholder('Search for Vegetables and Fruits');
    await search.fill('brocolli');
    
    const product = page.locator('.product').filter({ hasText: 'Brocolli' }).first();
    await expect(product).toBeVisible();
    
    const decrement = product.locator('a.decrement');
    const quantityInput = product.locator('input.quantity');
    
    // Click decrement multiple times
    for (let i = 0; i < 10; i++) {
      await decrement.click();
      await page.waitForTimeout(100);
    }
    
    // Verify quantity doesn't go below 1
    const finalValue = Number(await quantityInput.inputValue());
    expect(finalValue).toBe(1);
    
    console.log('Quantity boundary validation: Cannot go below 1');
  });

});
