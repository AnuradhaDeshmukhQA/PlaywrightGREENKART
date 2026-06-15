import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';


//const { test, expect } = require('@playwright/test');
const { ProductsPage } = require('../../pages/ProductsPage');
const { CartPage } = require('../../pages/CartPage');

test.describe('GreenKart application  @positiveSce @regression', () => {
test('Add to cart product for GreenKart @smoke', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  await page.getByRole('link', { name: '+' }).first().click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).first().click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('cau');
  await page.getByRole('link', { name: '+' }).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('bee');
  await page.getByRole('link', { name: '+' }).dblclick();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
  await page.getByRole('textbox', { name: 'Enter promo code' }).click();
  await page.getByRole('textbox', { name: 'Enter promo code' }).fill('12345');
  await page.getByRole('textbox', { name: 'Enter promo code' }).click();
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByText('Invalid code ..!').click();
  await page.getByRole('textbox', { name: 'Enter promo code' }).click();
  await page.getByRole('textbox', { name: 'Enter promo code' }).fill('');
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('combobox').selectOption('India');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('onion');
  await page.getByRole('link', { name: '–' }).click();
  await page.getByRole('link', { name: '+' }).dblclick();
  await page.getByRole('link', { name: '+' }).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('');
  await page.locator('#root').click();
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('body').press('ArrowDown');
  await page.locator('div:nth-child(25) > .product-action > button').click();
  await page.getByRole('button', { name: '✔ ADDED' }).press('ArrowUp');
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('str');
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByRole('row', { name: 'Price :' }).getByRole('strong').click();
  await page.getByRole('cell', { name: '3' }).click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Water Melon - 1 Kg281 No. 28×' }).getByRole('link').click();
  await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
});



test('Add to cart product for GreenKart @regression @smoke', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

  // Use placeholder (stable) instead of role name text
  const search = page.getByPlaceholder('Search for Vegetables and Fruits');

  await search.fill('cau'); // Cauliflower
  const cauliflower = page.locator('.products .product').filter({ hasText: 'Cauliflower' });

  await expect(cauliflower).toBeVisible();

  // Scope actions to the specific product card
 
// Click the + sign (this is the correct selector)
  await cauliflower.locator('a.increment').click();

  await cauliflower.getByRole('button', { name: 'ADD TO CART' }).click();
  //for Bitroot 
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('bee');
  const bitroot = page.locator('.products .product').filter({ hasText: 'Beetroot' });
  await expect(bitroot).toBeVisible();
  await bitroot.locator('.increment').click();
  await bitroot.getByRole('button', { name: 'ADD TO CART' }).click();
  //for Onion
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).click();
  await page.getByRole('searchbox', { name: 'Search for Vegetables and' }).fill('man');
  const mango = page.locator('.products .product').filter({ hasText: 'Mango' });
  await expect(mango).toBeVisible();
  await mango.locator('.increment').click();
  await page.getByRole('link', { name: '+' }).first().click();
  await page.getByRole('link', { name: '+' }).first().click();
  await page.getByRole('link', { name: '–' }).first().click();
  await page.getByRole('link', { name: '–' }).click();
  await mango.getByRole('button', { name: 'ADD TO CART' }).click();
  // Validate cart has the product
  await page.getByRole('link', { name: 'Cart' }).click(); // or the cart icon locator
  await page.getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
// Example assertion on checkout page
  await expect(page.locator('tbody tr')).toContainText(['Cauliflower - 1 Kg']);
  //console.log(page.locator('tbody tr')).toContainText(['Mango']);
  await expect(page.locator('tbody tr')).toContainText(['Beetroot - 1 Kg']);
  //const discount = page.locator('.discountAmt').textContent();
  //console.log(discount);
  
// Read and log
const discPercText = (await page.locator('.discountPerc').innerText()).trim();
const afterDiscText = (await page.locator('.discountAmt').innerText()).trim();

console.log('Discount %:', discPercText);
console.log('Total After Discount:', afterDiscText);

  await page.getByRole('textbox', { name: 'Enter promo code' }).click();
  await page.getByRole('textbox', { name: 'Enter promo code' }).fill('12345');
  await page.getByRole('textbox', { name: 'Enter promo code' }).click();
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.getByText('Invalid code ..!').click();
  await page.getByRole('textbox', { name: 'Enter promo code' }).click();
  await page.getByRole('textbox', { name: 'Enter promo code' }).fill('');
  await page.getByRole('button', { name: 'Place Order' }).click();
  await page.getByRole('combobox').selectOption('India');
  await page.getByRole('checkbox').check();
// After placing order
await page.locator('button:has-text("Proceed")').click();
// Verify & print the success message
  const successMsg = page.getByText('Thank you, your order has been placed successfully', { exact: false });
  await expect(successMsg).toBeVisible({ timeout: 10000 });
  //await expect(successMsg).toBeVisible({ timeout: 10000 });
  const text = (await successMsg.innerText()).trim();
  console.log(' Success message:', text);
  

});
});

test.describe('@greenkart @positive', () => {

  test('Add Cauliflower to cart using POM @POM', async ({ page }) => {

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");

    // Search product
    await productsPage.searchItem("CAU");

    // Wait for the specific product to be visible
    await productsPage.waitForItemVisible("Cauliflower");

    // Add the product to cart
    await productsPage.addToCart("Cauliflower");

    // Open cart and checkout
    await cartPage.openCart();

    // Validation (Cart Summary Page) 
    const cartProduct = page.locator("td p.product-name");
    await expect(cartProduct).toContainText("Cauliflower");
  });

});

//write a login test for GreenKart application using POM and data driven approach.
test('Login test for GreenKart application using POM and data driven approach @POM @dataDriven', async ({ page }) => {

  const loginPage = new LoginPage(page);    
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");

  // Test data for login    
  const testData = [
    { username: "validUser", password: "validPass", expected: "Login successful" },
    { username: "invalidUser", password: "invalidPass", expected: "Invalid credentials" },
    { username: "", password: "", expected: "Username and password required" }
  ];                                                                            
  for (const data of testData) {
    await loginPage.login(data.username, data.password);
    const message = await loginPage.getLoginMessage();
    console.log(`Test with username: ${data.username} - Expected: ${data.expected}, Actual: ${message}`);
    // Add assert ions based on expected outcomes
    if (data.expected === "Login successful") {
      await expect(message).toContain("Welcome");
    } else {
      await expect(message).toContain(data.expected);
    } 
  }
  //validation for successful login can be added here (e.g., checking for user profile visibility)
  await expect(page.locator('.user-profile')).toBeVisible();
  await page.click('button.logout'); // Logout after tests
});
