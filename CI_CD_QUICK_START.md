# CI/CD Quick Start Guide

## 🚀 GitHub Actions Setup (Recommended)

### Step 1: Verify Files Are Created
Check that these files exist in your project:
- ✅ `.github/workflows/playwright-tests.yml`
- ✅ `playwright.config.js` (updated)
- ✅ `package.json` (with test scripts)
- ✅ `.env.local` (development)
- ✅ `.env.ci` (CI configuration)

### Step 2: Push to GitHub

```powershell
# Navigate to your project
cd c:\Playwright_Automation\PlaywrightGREENKART

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "feat: Add CI/CD configuration with GitHub Actions"

# Push to GitHub
git push origin main
```

### Step 3: GitHub Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Actions** → **General**
3. Enable "Allow all actions and reusable workflows"
4. (Optional) Add Slack webhook:
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Add `SLACK_WEBHOOK_URL` if using Slack notifications

### Step 4: Verify Workflow

1. Go to **Actions** tab on GitHub
2. You should see "Playwright Tests" workflow
3. Click on it to see the workflow details
4. Manually trigger with **Run workflow** button

---

## 📋 Test Script Commands

Run these commands locally to test the setup:

```bash
# Run all tests
npm test

# Run only smoke tests
npm run test:smoke

# Run regression tests (main branch only in CI)
npm run test:regression

# Run tests with browser visible
npm run test:headed

# Debug mode (interactive)
npm run test:debug

# View last test report
npm run report

# Clean and run fresh tests
npm run report:clean
```

---

## 🔄 How CI/CD Runs

### On Every Push:
```
1. Checkout code
2. Setup Node.js (v18, v20)
3. Install dependencies (npm ci)
4. Install Playwright browsers
5. Run smoke tests (@smoke tag)
6. ✅ If smoke tests pass → PR is approved
7. ❌ If smoke tests fail → PR shows failure
```

### On Push to Main Branch:
```
1. All of above +
2. Run regression tests (@regression tag)
3. Run on multiple Node versions (18.x, 20.x)
```

### Scheduled Daily (2 AM UTC):
```
1. Full regression test suite
2. Report results
3. Archive test reports and videos
```

---

## 📊 Viewing Test Results

### GitHub Actions Report
1. Go to **Actions** tab
2. Click on the workflow run
3. Scroll down to see:
   - ✅ Test status (Pass/Fail)
   - 📊 Job summaries
   - 📎 Artifacts (reports, videos)

### Download Test Report
1. Go to **Actions** → Recent workflow run
2. Scroll to **Artifacts** section
3. Download `playwright-report-chromium-node18.x`
4. Extract and open `index.html` in browser

### View Test Videos
1. Download artifact from failed tests
2. Videos are in `.webm` format
3. Open with any video player

---

## 🔍 Troubleshooting

### Tests Pass Locally But Fail in CI

**Problem:** Works on your machine but fails in GitHub Actions

**Solutions:**
```javascript
// 1. Use explicit waits instead of timeouts
await page.waitForLoadState('networkidle'); // Good
// ❌ await page.waitForTimeout(5000); // Bad

// 2. Use role-based locators (stable)
await page.getByRole('button', { name: 'Add' }).click(); // Good
// ❌ page.locator('.btn-add').click(); // Fragile

// 3. Increase timeout for CI
const timeout = process.env.CI ? 30000 : 10000;
await expect(element).toBeVisible({ timeout });
```

### Workflow Not Running

Check `.github/workflows/playwright-tests.yml`:
- Branch names match your repo (main/develop)
- YAML syntax is correct (use 2-space indentation)
- No typos in workflow file

### Out of Memory Error

Update `playwright.config.js`:
```javascript
workers: isCI ? 1 : undefined // Reduce parallel workers
```

### Browser Not Found

Add this step in GitHub Actions:
```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium
```

---

## 📝 Custom Configurations

### Run Tests on Multiple Browsers

In `.github/workflows/playwright-tests.yml`, update matrix:
```yaml
matrix:
  browser: [chromium, firefox, webkit]
```

And in `playwright.config.js`:
```javascript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
]
```

### Run on Schedule (Daily/Weekly)

In `.github/workflows/playwright-tests.yml`:
```yaml
schedule:
  - cron: '0 2 * * *'  # Daily at 2 AM UTC
  - cron: '0 2 * * 0'  # Weekly on Sundays
```

### Slack Notifications

1. Create Slack webhook: https://api.slack.com/apps
2. Add to GitHub Secrets: `SLACK_WEBHOOK_URL`
3. Already configured in workflow (uncomment if needed)

---

## 🎯 Best Practices

✅ **DO:**
- Use test tags (@smoke, @regression) to categorize tests
- Run smoke tests on every PR
- Run full regression suite on main branch
- Keep tests independent and isolated
- Use explicit waits and role-based locators
- Archive test reports and videos
- Set branch protection rules

❌ **DON'T:**
- Use `test.only()` in main branch (CI will catch this)
- Hardcode waits: `page.waitForTimeout(5000)`
- Use environment-specific URLs
- Skip tests in CI
- Leave flaky tests unresolved

---

## 📚 Additional Resources

- **Playwright Docs:** https://playwright.dev/
- **GitHub Actions:** https://github.com/features/actions
- **Test Best Practices:** See TEST_PLAN.md
- **Configuration Details:** See CI_CD_SETUP_GUIDE.md

---

## 🎯 Next Steps

1. ✅ Push code to GitHub
2. ✅ Enable GitHub Actions
3. ✅ Verify first workflow run
4. ✅ Add branch protection rules
5. ✅ (Optional) Add Slack notifications
6. ✅ Monitor and optimize tests

---

**Happy Testing! 🚀**

For questions, refer to:
- GitHub Actions logs (GitHub → Actions → [Workflow])
- Test reports (Artifacts section)
- CI_CD_SETUP_GUIDE.md (detailed configuration)
- TEST_PLAN.md (test strategy)
