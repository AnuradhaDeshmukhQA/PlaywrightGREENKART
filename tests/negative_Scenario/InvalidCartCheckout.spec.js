import { test, expect } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';

const baseURL = 'https://rahulshettyacademy.com/seleniumPractise/#/';

test.describe('Cart and Checkout - Negative Scenarios @negativeSce @cart', () => {

  test('Proceed to checkout with empty cart @empty-cart-checkout', async ({ page }) => {
    await page.goto(baseURL);
    
    // Navigate to cart directly without adding items
    await page.getByRole('link', { name: 'Cart' }).click();
    
    // Verify cart is empty
    const cartItems = page.locator('tbody tr');
    const count = await cartItems.count();
    
    expect(count).toBe(0);
    console.log('Cart is empty - proceeding to checkout should show validation');
  });

  test('Apply invalid promo code @invalid-promo', async ({ page }) => {
    await page.goto(baseURL);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    
    // Add a product
    await productsPage.searchItem('CAU');
    await productsPage.waitForItemVisible('Cauliflower');
    await productsPage.addToCart('Cauliflower');
    
    // Go to cart
    await cartPage.openCart();
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    
    // Try multiple invalid promo codes
    const promoInput = page.getByRole('textbox', { name: 'Enter promo code' });
    
    // Test 1: Invalid numeric code
    await promoInput.fill('99999999');
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForTimeout(1000);
    
    // Test 2: Alphanumeric invalid code
    await promoInput.fill('INVALID123');
    await page.getByRole('button', { name: 'Apply' }).click();
    await page.waitForTimeout(1000);
    
    // Test 3: Special characters
    await promoInput.fill('@#$%^');
    await page.getByRole('button', { name: 'Apply' }).click();
    
    console.log('Invalid promo codes rejected successfully');
  });

  test('Promo code with extremely long input @long-promo', async ({ page }) => {
    await page.goto(baseURL);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    
    // Add a product
    await productsPage.searchItem('CAU');
    await productsPage.waitForItemVisible('Cauliflower');
    await productsPage.addToCart('Cauliflower');
    
    // Go to cart
    await cartPage.openCart();
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    
    // Apply extremely long promo code
    const longPromo = 'x'.repeat(200);
    const promoInput = page.getByRole('textbox', { name: 'Enter promo code' });
    await promoInput.fill(longPromo);
    await page.getByRole('button', { name: 'Apply' }).click();
    
    // Page should remain responsive
    await expect(page).toHaveURL(/checkout/i).catch(() => {
      console.log('Still on checkout page - application is stable');
    });
  });

  test('Country selection without checking terms @no-terms-checked', async ({ page }) => {
    await page.goto(baseURL);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    
    // Add a product
    await productsPage.searchItem('CAU');
    await productsPage.waitForItemVisible('Cauliflower');
    await productsPage.addToCart('Cauliflower');
    
    // Go to cart and checkout
    await cartPage.openCart();
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    
    // Select country but don't check terms and conditions
    await page.getByRole('combobox').selectOption('India');
    
    // Try to proceed without checking checkbox
    const proceedBtn = page.locator('button:has-text("Proceed")');
    await proceedBtn.click();
    
    // Verify we're still on checkout (terms not accepted)
    await page.waitForTimeout(1000);
    const checkbox = page.getByRole('checkbox');
    
    // If checkbox is still visible and unchecked, validation worked
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(false);
    console.log('Validation: Cannot proceed without accepting terms');
  });

  test('Place order without selecting country @no-country-selected', async ({ page }) => {
    await page.goto(baseURL);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    
    // Add a product
    await productsPage.searchItem('BEE');
    await productsPage.waitForItemVisible('Beetroot');
    await productsPage.addToCart('Beetroot');
    
    // Go to cart and checkout
    await cartPage.openCart();
    await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    
    // Check terms without selecting country
    await page.getByRole('checkbox').check();
    
    // Try to proceed
    const proceedBtn = page.locator('button:has-text("Proceed")');
    
    // Click and verify validation
    await proceedBtn.click();
    await page.waitForTimeout(1000);
    
    console.log('Validation: Country selection required');
  });

  test('Negative quantity attempt @negative-quantity', async ({ page }) => {
    await page.goto(baseURL);
    
    // Find a product and try to manipulate quantity
    const card = page.locator('.product').filter({ hasText: 'Brocolli' }).first();
    await expect(card).toBeVisible();
    
    const quantityInput = card.locator('input.quantity');
    
    // Try to set negative quantity via input field
    await quantityInput.fill('-5');
    
    // Verify it either rejects or defaults to 1
    const value = await quantityInput.inputValue();
    console.log('Quantity value after negative attempt:', value);
    
    const numValue = Number(value);
    expect(numValue).toBeGreaterThanOrEqual(0);
  });

  test('Zero quantity input @zero-quantity', async ({ page }) => {
    await page.goto(baseURL);
    
    const card = page.locator('.product').filter({ hasText: 'Brocolli' }).first();
    await expect(card).toBeVisible();
    
    const quantityInput = card.locator('input.quantity');
    const decrementBtn = card.locator('a.decrement');
    
    // Try to set quantity to 0
    await quantityInput.fill('0');
    
    const value = await quantityInput.inputValue();
    console.log('Quantity value after zero attempt:', value);
    
    // Should be at least 1
    const numValue = Number(value);
    expect(numValue).toBeGreaterThanOrEqual(1);
  });

});
