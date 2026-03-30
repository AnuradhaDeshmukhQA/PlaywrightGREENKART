//import { test,expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');

test('First playwright test case format of code',async({browser})=>
{

// playwright code---
//step1---open browser
//step2----enter uesername/password
//step3---click

});

test('Browser Context playwright declaration test',async({browser})=>
    {
    chrome - plugins/cookies
    const context = await browser.newContext ();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    });

test ('Page playwright test case name',async({page})=>
        {
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        //get title and put assertion
        console.log(await page.title());
        
        });

       
test('Login page loads and shows username field', async ({ page }) => 
            {
                   await page.goto('https://rahulshettyacademy.com/loginpagePractise/', { waitUntil: 'domcontentloaded' });
        
          // Title assertion (use a forgiving regex)
          await expect(page).toHaveTitle(/Rahul Shetty Academy/i);
         //get title and put assertion
         console.log(await page.title());
          // Correct selector for id="username"
          const username = page.locator('#username');
          await expect(username).toBeVisible({ timeout: 5000 });
        });
        
 test ('Rahul Shetty practice page', async ({ page }) => {
            //js file- Login js, DashboardPage
            const email = "rahulshettyacademy";
            const productName = 'zara coat 3';
            const products = page.locator(".card-body");
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            await page.locator("#username").fill(email);
            await page.locator("#password").fill("learning");
            await page.locator("#signInBtn").click();
            //console.log(await page.locator("[style*='none']").textContent());
            await page.waitForLoadState('networkidle');
            await page.locator(".card-img-top").first().waitFor();
            const titles = await page.locator(".card-img-top").allTextContents();
            console.log(titles); 
            await expect(page).toHaveScreenshot();
          
         })

