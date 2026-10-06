import { test, expect } from '@playwright/test';
import { count } from 'console';

test("Amazon item fetch", async ({ page }) => {
    await page.goto("https://www.amazon.in/");
    const block = page.locator("(//h3/span/span[@aria-hidden='true' and normalize-space()='Recommendations for you'])[1]");
    await block.scrollIntoViewIfNeeded()
// Card madhla text console var print kara
await expect(block).toBeVisible();
console.log(await block.innerText());
});

test("Amazon card contains four items", async ({ page }) => {
    await page.goto("https://www.amazon.in/s?k=wireless+headphones", {
        waitUntil: "domcontentloaded",
    });

    const products = page.locator('div[data-component-type="s-search-result"]');
    await expect(products.first()).toBeVisible();

    const itemNames = await products.locator("a:has(h2)").evaluateAll((links) =>
        links
            .map((link) => (link.textContent || "").trim())
            .filter(Boolean)
            .slice(0, 4),
    );

    expect(itemNames).toHaveLength(4);
    for (const itemName of itemNames) {
        expect(itemName.trim()).not.toBe("");
        console.log(itemName.trim());
    }
});

test('Select third Google suggestion', async ({ page }) => {
   await page.goto('https://www.google.com/');
   const searchBox = page.getByRole('combobox', { name: 'Search' });
   await searchBox.fill('javascript');
   // Suggestions madhla third option select kara
   const thirdOption = page
    .getByRole('listbox')
    .getByRole('option')
    .nth(2);
  await expect(thirdOption).toBeVisible();
  console.log('Third suggestion is: ', await thirdOption.innerText());
  await thirdOption.click();
})

test('select third suggested option using for loop', async({page})=>{
    await page.goto("");
    const searchBox= await page.locator('');
    await searchBox.fill("JavaSCript");
    const suggestionOptions = await page.getByLabel('combobox').getByLabel('option')
    const totalCount = await suggestionOptions.count()
    console.log(`Total suggesed count is ${totalCount}`)
    for(i=0; i<=count;i++){
        if(i==2){
   const selectedOptionIs = await suggestionOptions.nth(i)
   await selectedOptionIs.click();
   console.log(`Selected option is ${selectedOptionIs.innerText()}`)
   break;

    }
   }

})