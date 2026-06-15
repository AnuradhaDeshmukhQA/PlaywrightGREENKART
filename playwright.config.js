
// playwright.config.js
// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',
  
  // Timeout settings
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  
  // Parallel execution
  fullyParallel: !isCI, // Parallel in local, serial in CI
  forbidOnly: isCI, // Fail if test.only is left in code during CI
  retries: isCI ? 2 : 0, // Retry failed tests 2x in CI
  workers: isCI ? 1 : undefined, // Single worker in CI for stability
  
  // Reporter configuration
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
    isCI && ['github'],
  ].filter(Boolean),
  
  // Global use settings
  use: {
    headless: isCI ? true : false,
    actionTimeout: 0,
    navigationTimeout: 30000,
    browserName: 'chromium',
    baseURL: 'https://rahulshettyacademy.com',
    screenshot: isCI ? 'only-on-failure' : 'off',
    trace: isCI ? 'retain-on-failure' : 'off',
    video: isCI ? 'retain-on-failure' : 'off',
    launchOptions: {
      slowMo: isCI ? 0 : 100,
    },
  },

  // Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    //Uncomment to run on Firefox and Safari
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
