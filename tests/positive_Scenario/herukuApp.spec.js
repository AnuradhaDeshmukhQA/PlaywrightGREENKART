import{test,expect} from '@playwright/test'



test("upload file",async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/upload")
   await page.waitForTimeout(5000);
    const chooseFile = await page.locator("//input[@id='file-upload']")
    await expect(chooseFile).toBeVisible()


})