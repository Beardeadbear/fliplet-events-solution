import { test, expect } from '@playwright/test';
import { OnboardingPage } from '../../page-objects/onboarding.page';

/**
 * Onboarding Tests
 * 
 * This spec contains tests that verify the application's initial
 * onboarding flow. It should run with a clean browser context.
 */
test.describe('Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    const onboardingPage = new OnboardingPage(page);

    // Use the page object's method for navigation to maintain consistency.
    await onboardingPage.goto();
    await page.waitForLoadState('networkidle');

    // Now that we're on the correct domain, we can safely clear storage.
    await page.context().clearCookies();
    await page.evaluate(() => {
      sessionStorage.clear();
      localStorage.clear();
    });
  });

  test('ONB-TC-001: User can navigate through the entire onboarding flow', async ({ page }) => {
    const onboardingPage = new OnboardingPage(page);
    await onboardingPage.completeOnboarding();
    
    // After onboarding, the user should land on a page containing "login" in the URL.
    await expect(page).toHaveURL(/.*login/);
  });
}); 