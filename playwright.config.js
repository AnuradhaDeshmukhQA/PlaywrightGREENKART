
// playwright.config.js
// @ts-check
const { defineConfig, devices } = require('@playwright/test');
export default defineConfig({
  retries: process.env.CI ? 2:0,
});
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },

  // Turn on headful by default for local debugging; switch to true in CI
  use: {
    headless: false,
    actionTimeout: 0,
    browserName: "chromium",
    baseURL: 'https://rahulshettyacademy.com',
    screenshot: 'on',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      slowMo: 100,
        }
  },

  // Run on one browser by default; uncomment others if you want
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'WebKit',  use: { ...devices['Desktop Safari'] } },
  ],

  reporter: [['html', { open: 'never' }], ['list']],
  
  
});
