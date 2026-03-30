const { test, expect } = require('@playwright/test');
const { buffer } = require('stream/consumers');

// Triggering CI pipeline test 
test ('Add "ZARA COAT 3" to cart and validate @sanity @CIpipeline', async ({ page }) => {
  const email = "anudesh2010@gmail.com";
  const productName = 'ZARA COAT 3';
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anudesh2010@gmail.com");
  await page.locator("#userPassword").fill("Mahi@8590");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles); 
  const count = await products.count();
//   for (let i = 0; i < count; ++i) {
//      if (await products.nth(i).locator("b").textContent() === productName) {
//         //add to cart
//         await products.nth(i).locator("text= Add To Cart").click();
//         break;
//      }
//     }
      await page.locator(".card-body").filter({hasText:'ZARA COAT 3'})
      .getByRole('button',{name:'Add To Cart'}).click();
       await page.locator("[routerlink*='cart']").click();
   //await page.pause();
   await page.locator("div[class='cartSection']").waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
   //await page.pause();
await page.locator("//div[@class='payment__cc']//div[2]//input[1]").fill('123');
await page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]").fill('Gaurav');
await page.locator("//div[@class='payment__info']//div[3]//div[1]//input[1]").scrollIntoViewIfNeeded();
// await page.locator('input[name="coupon"]').fill('12345'); ---I dont have the valid coupon code that why it is commented
// await page.getByRole('button', { name: 'Apply Coupon' }).click();
// await page.pause();
const value = await page.locator('p:has-text("* Invalid Coupon")').isVisible();
if(value){
   console.log("Invalid Coupon");
}
else{
   await page.getByPlaceholder('Select Country').pressSequentially("Ind",{delay:150});
   const dropdown = page.locator('section.ta-results.list-group.ng-star-inserted');
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   console.log(optionsCount);
   for (let i=0; i< optionsCount; ++i){
      const text = await dropdown.locator("button").nth(i).textContent();
      if(text === " India" ){
         await dropdown.locator("button").nth(i).click();
         break
      }
   }
}
expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator(".action__submit").click();
//await page.pause();   if we use .pause() method then the browser will open in debug mode thatwhy i have commented
// Wait for the thank-you message to be visible
const thankYouLocator = page.locator(".hero-primary");
// Get the text
const thankYouText = await thankYouLocator.textContent();
// Print in console
console.log("Thank you message:", thankYouText);
const orderid = page.locator("label.ng-star-inserted");
const myorderId = await orderid.textContent();
console.log(myorderId);

})