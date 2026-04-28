# GreenKart Application - Test Plan

## 1. Project Overview
**Project Name:** GreenKart Automation Suite  
**Application:** https://rahulshettyacademy.com/seleniumPractise/#/  
**Automation Tool:** Playwright  
**Framework:** Page Object Model (POM)  
**Language:** JavaScript

---

## 2. Testing Scope

### In Scope
- Product search and filtering
- Add to cart functionality
- Cart management (add/remove items)
- Checkout process
- Promo code validation
- Order placement
- UI elements and interactions
- Positive and negative test scenarios

### Out of Scope
- Payment gateway integration
- Email notifications
- Third-party integrations
- Performance/Load testing
- Security/Penetration testing

---

## 3. Test Objectives
- ✅ Validate core e-commerce functionality (search, add to cart, checkout)
- ✅ Ensure proper error handling for invalid inputs
- ✅ Verify UI elements load correctly
- ✅ Confirm successful order placement workflow
- ✅ Test discount and promo code application
- ✅ Validate product filtering and search capabilities

---

## 4. Test Strategy

### Testing Approach
- **Black Box Testing** - Testing user workflows
- **Smoke Testing** - Basic functional tests (@smoke tag)
- **Regression Testing** - Full test suite (@regression tag)
- **Positive Scenarios** - Happy path testing
- **Negative Scenarios** - Error handling and edge cases

### Test Execution
- **Automation Tool:** Playwright
- **Parallel Execution:** Supported
- **CI/CD Integration:** Ready for implementation
- **Cross-browser:** Chrome (default), extensible to Firefox, Safari

---

## 5. Test Cases & Scenarios

### 5.1 Positive Scenarios (`/tests/positive_Scenario/`)

#### Test Case: Add to Cart Product for GreenKart (@smoke, @regression)
**Description:** End-to-end flow of adding multiple products, applying promo code, and placing order  
**Priority:** Critical  
**Steps:**
1. Navigate to GreenKart home page
2. Search for Cauliflower (CAU)
3. Increment quantity and add to cart
4. Search for Beetroot (BEE)
5. Add to cart with multiple increments
6. Search for Mango (MAN)
7. Add to cart with quantity adjustments
8. Navigate to cart
9. Proceed to checkout
10. Apply invalid promo code (12345) - verify error message
11. Apply empty promo code
12. Select country (India)
13. Accept terms and conditions
14. Proceed with order placement
15. Verify success message

**Expected Result:** Order placed successfully with confirmation message  
**Tags:** @smoke, @regression, @positiveSce

---

#### Test Case: Add Cauliflower to Cart Using POM (@POM)
**Description:** Verify product addition to cart using Page Object Model pattern  
**Priority:** High  
**Steps:**
1. Navigate to GreenKart home page
2. Search for Cauliflower using search box
3. Wait for product visibility
4. Add Cauliflower to cart
5. Open cart
6. Validate product in cart

**Expected Result:** Cauliflower visible in cart summary  
**Tags:** @POM, @positive

---

#### Test Case: UI Basic Test
**Description:** Validate UI elements and basic interactions  
**Priority:** Medium  
**Steps:** [Defined in UIBasicTest.spec.js]

**Expected Result:** All UI elements render and respond correctly

---

#### Test Case: Practice Test
**Description:** General practice and validation tests  
**Priority:** Low  
**Steps:** [Defined in PracticeTest.spec.js]

---

### 5.2 Negative Scenarios (`/tests/negative_Scenario/`)

#### Test Case: Search Field Invalid Input (@negative)
**Description:** Validate search field behavior with invalid/edge case inputs  
**Priority:** High  
**Steps:**
1. Navigate to GreenKart home page
2. Enter invalid search terms (special characters, numbers, empty values)
3. Verify no results or error handling
4. Verify search field accepts valid inputs after invalid attempts

**Expected Result:** Search handles invalid inputs gracefully without crashing  
**Tags:** @negative

---

## 6. Test Environment

### Prerequisites
- **Node.js:** v14+ (or as per package.json)
- **Browser:** Chromium (auto-downloaded by Playwright)
- **Playwright:** Latest stable version
- **Dependencies:** Installed via npm

### Test Data
- **Test URL:** https://rahulshettyacademy.com/seleniumPractise/#/
- **Test Products:** Cauliflower, Beetroot, Mango, Onion, Strawberry, Watermelon
- **Invalid Promo Code:** 12345
- **Valid Country:** India

### Utilities & Page Objects
- `pages/ProductsPage.js` - Product search and add to cart operations
- `pages/CartPage.js` - Cart and checkout operations
- `pages/LoginPage.js` - Authentication (if needed)

---

## 7. Testing Tools & Configuration

### Configuration Files
- **playwright.config.js** - Playwright test configuration
- **cypress.config.js** - Cypress configuration (optional)
- **package.json** - Dependencies and scripts

### Test Execution Commands
```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/positive_Scenario/GreenKart.spec.js

# Run with specific tag
npx playwright test --grep @smoke

# Run in headed mode (visible browser)
npx playwright test --headed

# Run with specific browser
npx playwright test --project=chromium
```

---

## 8. Test Execution Schedule

| Phase | Duration | Target | Status |
|-------|----------|--------|--------|
| Test Planning | Week 1 | Complete documentation | ⏳ |
| Automation Development | Week 1-2 | All test cases automated | ⏳ |
| Smoke Testing | Daily | @smoke tests pass | ⏳ |
| Regression Testing | Weekly | All tests pass | ⏳ |
| CI/CD Integration | Week 3 | Automated execution | ⏳ |

---

## 9. Test Coverage

### Functional Coverage
- ✅ Product Search: 90%
- ✅ Shopping Cart: 85%
- ✅ Checkout Process: 80%
- ✅ Order Placement: 80%
- ✅ Promo Code Application: 75%
- ✅ Error Handling: 70%
- ✅ UI Elements: 75%

---

## 10. Defect Tracking

### Defect Template
```
Title: [Component] - Brief Description
Priority: P1/P2/P3
Severity: Critical/High/Medium/Low
Steps to Reproduce: [Details]
Expected Result: [What should happen]
Actual Result: [What actually happens]
Environment: [Browser, OS, Version]
Tags: @defect, [component]
```

---

## 11. Test Metrics & Reporting

### Metrics to Track
- **Total Test Cases:** [Number]
- **Automated Test Cases:** [Number]
- **Execution Time:** [Minutes]
- **Pass Rate:** [%]
- **Failure Rate:** [%]
- **Code Coverage:** [%]

### Report Format
- Console output with test results
- HTML report generation (Playwright built-in)
- Test duration and status summary

---

## 12. Risk Assessment & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| Application downtime | Low | High | Use staging environment; implement retry logic |
| Flaky tests due to timing | Medium | Medium | Add explicit waits; use stable locators (role-based) |
| Incomplete page loads | Medium | Medium | Implement waitForLoadState(); increase timeout |
| Test data inconsistency | Low | Medium | Reset test data before each test |
| Browser compatibility | Low | Medium | Test on multiple browsers (Chromium, Firefox, Safari) |

---

## 13. Success Criteria

✅ All smoke tests (@smoke) pass with 100% success rate  
✅ All regression tests (@regression) pass with >95% success rate  
✅ No critical/blocker defects remain open  
✅ Average test execution time < 5 minutes  
✅ Code coverage > 80%  
✅ All tests maintainable and properly documented  

---

## 14. Resources Required

### Team
- **QA Automation Engineer** - Test development and maintenance
- **QA Lead** - Test plan review and approval
- **Dev Team** - Support for test environment issues

### Tools & Infrastructure
- Playwright framework
- GitHub/GitLab for version control
- CI/CD pipeline (Jenkins, GitHub Actions, etc.)
- Test execution environment

---

## 15. Exit Criteria

Testing phase can be considered complete when:
1. All planned test cases are executed
2. Pass rate is ≥ 95%
3. All critical/blocker issues are resolved
4. Test documentation is complete
5. Test suite is integrated into CI/CD pipeline
6. Team is trained on test execution and maintenance

---

## 16. Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | - | - | - |
| Project Manager | - | - | - |
| Dev Manager | - | - | - |

---

## 17. Appendix

### A. Test Naming Convention
- Pattern: `[Component]_[Action]_[Expected Result].spec.js`
- Example: `AddToCart_ValidProduct_SuccessfullyAdded.spec.js`

### A. Tag Convention
- `@smoke` - Critical path tests
- `@regression` - Full regression suite
- `@positive` - Happy path scenarios
- `@negative` - Error/edge case scenarios
- `@POM` - Page Object Model tests
- `@positiveSce` - Positive scenario tests

### B. Useful Resources
- Playwright Documentation: https://playwright.dev/
- GreenKart Application: https://rahulshettyacademy.com/seleniumPractise/#/
- Best Practices: [Add internal wiki/documentation link]

---

**Last Updated:** April 27, 2026  
**Version:** 1.0  
**Status:** Draft
