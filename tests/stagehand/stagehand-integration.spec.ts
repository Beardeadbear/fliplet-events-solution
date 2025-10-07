import { test, expect } from '../../fixtures/stagehand.fixture';
import { LoginPage } from '../../page-objects/login.page';
import { OnboardingPage } from '../../page-objects/onboarding.page';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../../test-data/app.data';

/**
 * Stagehand Integration Tests
 * 
 * These tests demonstrate the integration of Stagehand with Playwright
 * using both page object methods and direct fixture usage.
 */
test.describe('Stagehand Integration Tests', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    // Complete onboarding to reach login page
    await page.context().clearCookies();
    await page.context().clearPermissions();
    const onboardingPage = new OnboardingPage(page);
    await onboardingPage.goto();
    await onboardingPage.completeOnboarding();
    loginPage = new LoginPage(page);
  });

  test('STAGEHAND-TC-001: Login using page object Stagehand method', async ({ page }) => {
    // Use Stagehand method from page object
    await loginPage.loginWithStagehand(ADMIN_EMAIL, ADMIN_PASSWORD);
    
    // Verify successful login
    await expect(page).toHaveURL(/home|dashboard|main/);
  });

  test('STAGEHAND-TC-002: Login using hybrid approach', async ({ page }) => {
    // Use hybrid method (Playwright + Stagehand)
    await loginPage.loginHybrid(ADMIN_EMAIL, ADMIN_PASSWORD);
    
    // Verify successful login
    await expect(page).toHaveURL(/home|dashboard|main/);
  });

  test('STAGEHAND-TC-003: Login using fixture Stagehand directly', async ({ page, stagehand }) => {
    // Use Stagehand from fixture directly
    await stagehand.page.act(`Fill email field with ${ADMIN_EMAIL}`);
    await stagehand.page.act(`Fill password field with ${ADMIN_PASSWORD}`);
    await stagehand.page.act(`Click login button`);
    
    // Verify successful login
    await expect(page).toHaveURL(/home|dashboard|main/);
  });

  test('STAGEHAND-TC-004: Mixed approach - Playwright + Stagehand', async ({ page, stagehand }) => {
    // Use Playwright for reliable form filling
    await loginPage.emailInput.fill(ADMIN_EMAIL);
    await loginPage.passwordInput.fill(ADMIN_PASSWORD);
    
    // Use Stagehand for complex interaction
    await stagehand.page.act(`Click the login button`);
    
    // Use Playwright for validation
    await expect(page).toHaveURL(/home|dashboard|main/);
  });

  test('STAGEHAND-TC-005: Visual validation with Stagehand', async ({ page }) => {
    // Use Stagehand for visual validation
    await loginPage.validateLoginFormWithStagehand();
    
    // Verify we're still on login page
    await expect(page).toHaveURL(/login/);
  });
});
