const { test } = require('@playwright/test');

test("Amazon keyboard",async({page})=>{

await page.goto("https://www.amazon.in/");
const asus= await page.locator("//span[contains(text(),'Asus | Starting ₹599')]")
console.log(asus)

await page.locator("//div[@id ='CardInstance8wnuLvEhlDnzqh5Q-yhS-g']").allTextContents()
//await expect(asus).toHaveText("Asus | Starting ₹599");
//div[@id ="CardInstance8wnuLvEhlDnzqh5Q-yhS-g"]
})