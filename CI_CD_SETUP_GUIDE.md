# CI/CD Configuration Guide for GreenKart Automation

## Overview
This guide covers setting up Continuous Integration/Continuous Deployment (CI/CD) for your Playwright automation tests using GitHub Actions, with additional guidance for other platforms.

---

## 1. GitHub Actions Setup (Recommended)

### 1.1 Create GitHub Actions Workflow

Create a new file: `.github/workflows/playwright-tests.yml`

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop, feature/* ]
  pull_request:
    branches: [ main, develop ]
  schedule:
    # Run tests daily at 2 AM UTC
    - cron: '0 2 * * *'
  # Allow manual trigger from GitHub UI
  workflow_dispatch:

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    strategy:
      fail-fast: false
      matrix:
        node-version: [16.x, 18.x, 20.x]
        browser: [chromium, firefox, webkit]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps ${{ matrix.browser }}
      
      - name: Run Playwright tests
        run: npx playwright test --project=${{ matrix.browser }}
        env:
          CI: true
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-${{ matrix.browser }}-node${{ matrix.node-version }}
          path: playwright-report/
          retention-days: 30
      
      - name: Upload test videos
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: test-videos-${{ matrix.browser }}-node${{ matrix.node-version }}
          path: test-results/
          retention-days: 7
      
      - name: Publish test report
        if: always()
        uses: daun/playwright-report-action@v3
        with:
          report-path: playwright-report/

  smoke-tests:
    timeout-minutes: 30
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18.x
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run smoke tests
        run: npx playwright test --grep @smoke
        env:
          CI: true
      
      - name: Comment PR with results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('playwright-report/index.html', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Playwright smoke tests passed!'
            });

  regression-tests:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    if: github.event_name == 'push' || github.event_name == 'schedule'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18.x
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      
      - name: Run regression tests
        run: npx playwright test --grep @regression
        env:
          CI: true

  test-summary:
    name: Test Summary
    if: always()
    needs: [test, smoke-tests]
    runs-on: ubuntu-latest
    
    steps:
      - name: Test Report
        run: |
          echo "✅ Smoke Tests: ${{ needs.smoke-tests.result }}"
          echo "✅ Full Tests: ${{ needs.test.result }}"
```

---

## 2. Updated Configuration Files

### 2.1 Update package.json with Test Scripts

Add these scripts to your `package.json`:

```json
{
  "name": "playwright_automation",
  "version": "1.0.0",
  "description": "GreenKart Playwright Automation",
  "main": "index.js",
  "scripts": {
    "test": "playwright test",
    "test:debug": "playwright test --debug",
    "test:headed": "playwright test --headed",
    "test:smoke": "playwright test --grep @smoke",
    "test:regression": "playwright test --grep @regression",
    "test:positive": "playwright test --grep @positive",
    "test:negative": "playwright test --grep @negative",
    "test:chromium": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:webkit": "playwright test --project=webkit",
    "test:single": "playwright test tests/positive_Scenario/GreenKart.spec.js",
    "report": "playwright show-report",
    "report:clean": "rm -rf playwright-report test-results && playwright test && playwright show-report"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@playwright/test": "^1.59.1",
    "@types/node": "^24.10.2",
    "cypress": "^15.11.0"
  }
}
```

### 2.2 Update playwright.config.js for CI/CD

```javascript
// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

const isCI = !!process.env.CI;

module.exports = defineConfig({
  testDir: './tests',
  
  // Timeout for each test
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  
  // Parallel execution
  fullyParallel: true,
  forbidOnly: isCI, // Fail if test.only is left in code
  retries: isCI ? 2 : 0, // Retry failed tests in CI
  workers: isCI ? 1 : undefined, // Use single worker in CI for stability
  
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
    isCI && ['github'],
  ].filter(Boolean),
  
  // Global configuration
  use: {
    headless: isCI ? true : false,
    actionTimeout: 0,
    navigationTimeout: 30000,
    baseURL: 'https://rahulshettyacademy.com',
    screenshot: isCI ? 'only-on-failure' : 'off',
    trace: isCI ? 'retain-on-failure' : 'off',
    video: isCI ? 'retain-on-failure' : 'off',
    launchOptions: {
      slowMo: isCI ? 0 : 100,
    },
  },
  
  // Configure projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Uncomment to run on Firefox and Safari in CI
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  
  // Global setup/teardown
  // globalSetup: require.resolve('./global-setup.ts'),
  // globalTeardown: require.resolve('./global-teardown.ts'),
  
  // Web Server (if needed)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !isCI,
  // },
});
```

---

## 3. Environment-Specific Configuration

### 3.1 Create .env files

**`.env.local` (Development - add to .gitignore)**
```
PLAYWRIGHT_HEADLESS=false
BROWSER_NAME=chromium
BASE_URL=https://rahulshettyacademy.com
LOG_LEVEL=debug
```

**`.env.ci` (CI/CD Environment)**
```
PLAYWRIGHT_HEADLESS=true
BROWSER_NAME=chromium
BASE_URL=https://rahulshettyacademy.com
LOG_LEVEL=info
RETRY_ATTEMPTS=2
PARALLEL_WORKERS=1
```

**`.env.staging` (Staging Environment)**
```
PLAYWRIGHT_HEADLESS=true
BROWSER_NAME=chromium
BASE_URL=https://staging.rahulshettyacademy.com
LOG_LEVEL=info
```

### 3.2 Update .gitignore

```gitignore
# Dependencies
node_modules/
npm-debug.log*

# Test artifacts
test-results/
playwright-report/
.auth/

# Environment files
.env.local
.env*.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Coverage
coverage/
```

---

## 4. Jenkins Pipeline Configuration

If using Jenkins, create a `Jenkinsfile`:

```groovy
pipeline {
    agent any
    
    environment {
        NODE_ENV = 'test'
        CI = 'true'
    }
    
    options {
        timestamps()
        timeout(time: 60, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    triggers {
        cron('H 2 * * *') // Daily at 2 AM
        githubPush()
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                    node --version
                    npm --version
                    npm ci
                    npx playwright install --with-deps chromium
                '''
            }
        }
        
        stage('Run Smoke Tests') {
            steps {
                sh 'npm run test:smoke'
            }
        }
        
        stage('Run Full Tests') {
            when {
                branch 'main'
            }
            steps {
                sh 'npm run test'
            }
        }
        
        stage('Generate Report') {
            when {
                always()
            }
            steps {
                junit 'test-results/junit.xml'
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report',
                    keepAll: true
                ])
            }
        }
    }
    
    post {
        always {
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            cleanWs()
        }
        failure {
            mail to: 'team@example.com',
                 subject: "Test Failure: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                 body: "Build failed. Check console output at ${env.BUILD_URL}"
        }
    }
}
```

---

## 5. GitLab CI/CD Configuration

Create `.gitlab-ci.yml`:

```yaml
image: node:18

stages:
  - test
  - report

variables:
  CI: "true"

cache:
  paths:
    - node_modules/
    - .playwright/

smoke_tests:
  stage: test
  script:
    - npm ci
    - npx playwright install --with-deps chromium
    - npm run test:smoke
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
    reports:
      junit: test-results/junit.xml
    expire_in: 30 days
  allow_failure: false

regression_tests:
  stage: test
  script:
    - npm ci
    - npx playwright install --with-deps chromium
    - npm run test:regression
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
    reports:
      junit: test-results/junit.xml
    expire_in: 30 days
  only:
    - main
    - develop
```

---

## 6. CI/CD Best Practices

### 6.1 Test Stability
```javascript
// Recommended practices in your tests:
// ✅ Use explicit waits
await page.waitForLoadState('networkidle');
await expect(element).toBeVisible({ timeout: 10000 });

// ✅ Use stable locators (role-based)
await page.getByRole('button', { name: 'Add to Cart' }).click();

// ✅ Avoid hard-coded delays
// ❌ AVOID: await page.waitForTimeout(5000);

// ✅ Use proper error handling
try {
  await page.goto(url);
} catch (error) {
  console.error('Navigation failed:', error);
}
```

### 6.2 Retry Strategy
```javascript
// Automatically handled in CI via config:
// retries: isCI ? 2 : 0
// This will retry failed tests up to 2 times in CI
```

### 6.3 Parallel Execution
```javascript
// Local: Run tests in parallel for speed
// CI: Run sequentially for stability
workers: isCI ? 1 : undefined
```

---

## 7. Monitoring & Notifications

### 7.1 Slack Notification (GitHub Actions)

Add to `.github/workflows/playwright-tests.yml`:

```yaml
  - name: Notify Slack on Failure
    if: failure()
    uses: slackapi/slack-github-action@v1.24.0
    with:
      payload: |
        {
          "text": "❌ Playwright Tests Failed",
          "blocks": [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "*Test Failure Report*\nBranch: ${{ github.ref }}\nCommit: ${{ github.sha }}\n<${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}|View Details>"
              }
            }
          ]
        }
    env:
      SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### 7.2 Email Notifications

For Slack/email setup, add webhook URLs to GitHub Secrets:
1. Go to Repository → Settings → Secrets and variables
2. Add: `SLACK_WEBHOOK_URL`

---

## 8. Quick Start Checklist

- [ ] Create `.github/workflows/playwright-tests.yml`
- [ ] Update `package.json` with test scripts
- [ ] Update `playwright.config.js` for CI environment
- [ ] Create `.env.ci` file
- [ ] Push code to repository
- [ ] Enable GitHub Actions in repository settings
- [ ] Add branch protection rules requiring tests to pass
- [ ] (Optional) Add Slack webhook for notifications
- [ ] (Optional) Set up scheduled nightly tests

---

## 9. Troubleshooting Common Issues

| Issue | Solution |
|-------|----------|
| Tests pass locally but fail in CI | Check CI config, enable trace/video, verify dependencies |
| Timeout errors in CI | Increase timeout, use proper waits, check network connectivity |
| Flaky tests | Use explicit waits, avoid hardcoded delays, use stable locators |
| Browser not found | Ensure `npx playwright install` is called, check cache |
| Out of memory | Reduce parallel workers, enable debugging |

---

## 10. Test Execution Flow

```
Push Code
    ↓
GitHub Actions Triggered
    ↓
├─ Checkout Code
├─ Setup Node.js
├─ Install Dependencies
├─ Install Browsers
├─ Run Smoke Tests (@smoke)
└─ (if main branch) Run Full Tests
    ↓
Generate Reports
    ↓
Upload Artifacts
    ↓
Publish Results
    ↓
Notify Team (Slack/Email)
```

---

## 11. Advanced Configuration

### Parallel Browsers
Uncomment in `playwright.config.js`:
```javascript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

### Custom Base URL per Environment
```javascript
// In your test
const baseURL = process.env.BASE_URL || 'https://rahulshettyacademy.com';
await page.goto(baseURL);
```

### Database/API Mocking
```javascript
// Use MSW (Mock Service Worker) or intercept API calls
await page.route('**/api/**', route => {
  route.abort('blockedbyclient');
});
```

---

**Last Updated:** April 27, 2026  
**Version:** 1.0
