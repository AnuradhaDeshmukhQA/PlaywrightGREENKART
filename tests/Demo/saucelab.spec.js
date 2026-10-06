import { test, expect } from "@playwright/test";

test("e-2-e flow for Sauce Lab", async({page}) => {
await page.goto("https://www.saucedemo.com/");
await page.locator("//input[@id='user-name']").fill("standard_user");
await page.locator("//input[@id='password']").fill("secret_sauce");
await page.locator("//input[@id='login-button']").click();
await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
console.log(`Page is redirecting to this url ${page.url()}`);
await page.locator("//a[@id='item_4_title_link']//div[text()='Sauce Labs Backpack']").click();
const cartPage = await page.locator("//button[@id='back-to-products']");
await expect(cartPage).toBeVisible()
console.log(` Cart page is visible ${cartPage}`)
});


test("API Mocking to handel error",async ({ page }) => {
    //// Arrange: Intercept the API request before opening the page
    await page.route("**inventory-item.html?id=4*", async route => {
    await route.fulfill({
          status: 500,
      contentType: 'application/json',
       body: '<h1>Something went wrong</h1>'
    //   json: {
    //        message: 'Internal server error'
    //   }
    })
    })
   // Act: Open the page that calls GET /api/users
   await page.goto("https://www.saucedemo.com/inventory-item.html?id=4")
 //await page.goto('https://your-application.com/users');

    // Assert: Verify that the UI shows an error message
    const errorMsg = await page.getByText('Something went wrong')
   await expect(errorMsg).toBeVisible();
   console.log(`Erro msg is displaying on UI is ${errorMsg}`)
});




test('Mock a server error page', async ({ page }) => {
  const url = 'https://www.saucedemo.com/inventory-item.html?id=4';

  // Arrange: Replace the page response with an HTML error page.
  await page.route(url, async route => {
    await route.fulfill({
      status: 500,
      contentType: 'text/html',
      body: `
        <!DOCTYPE html>
        <html>
          <body>
            <h1>Something went wrong</h1>
            <p>Internal server error</p>
          </body>
        </html>
      `,
    });
  });

  // Act
  const response = await page.goto(url);
console.log(response)
  // Assert
  expect(response.status()).toBe(500);

  const errorMsg = page.getByRole('heading', {
    name: 'Something went wrong',
  });

  await expect(errorMsg).toBeVisible();

  console.log(`Error message displayed: ${await errorMsg.innerText()}`);
});
