import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login.page';
import { OnboardingPage } from '../../page-objects/onboarding.page';
import { HomePage } from '../../page-objects/home.page';
import { 
  loginAsAdmin, 
  loginAsAttendee,
  loginWithInvalidPassword,
  loginWithNonExistentEmail,
  loginWithEmptyFields,
  loginWithEmptyEmail,
  loginWithEmptyPassword
} from '../../helpers/auth/login';
import { 
  ADMIN_EMAIL, 
  ADMIN_PASSWORD, 
  ATTENDEE_EMAIL, 
  ATTENDEE_PASSWORD, 
  INVALID_EMAIL, 
  INVALID_PASSWORD,
  BASE_URL 
} from '../../test-data/app.data';

/**
 * Login Tests
 * 
 * These tests cover the login functionality of the application.
 * Each test begins after the onboarding flow has been completed.
 */
test.describe('Login Functionality', () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  
  test.beforeEach(async ({ page }) => {
    // Before each test, we must complete the onboarding flow to reach the login page.
    await page.context().clearCookies();
    await page.context().clearPermissions();
    const onboardingPage = new OnboardingPage(page);
    await onboardingPage.goto();
    await onboardingPage.completeOnboarding();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
  });

  

  test('LOGIN-TC-001: Successful Admin login', async ({ page }) => {
    // Retry logic for intermittent failures
    await loginAsAdmin(page);
  });
  
  test('LOGIN-TC-002: Successful Internal Member login', async ({ page }) => {
    await loginAsAttendee(page);
  });


  test('LOGIN-TC-003: Login fails with invalid password', async ({ page }) => {
    await loginWithInvalidPassword(page, ADMIN_EMAIL, INVALID_PASSWORD);
  });


  test('LOGIN-TC-004: Login fails with a non-existent email', async ({ page }) => {
    await loginWithNonExistentEmail(page, INVALID_EMAIL, INVALID_PASSWORD);
  });



  test('LOGIN-TC-006: User can access Forgot Password and see reset flow', async ({ page }) => {
    // Verify we're in login state
    const isInLogin = await loginPage.isInLoginState();
    expect(isInLogin).toBe(true);
    
    // Wait for page to be fully loaded before clicking
    await page.waitForLoadState('networkidle');
    
    // Click forgot password link
    await loginPage.forgotPasswordLink.waitFor({ state: 'visible' });
    await loginPage.forgotPasswordLink.click();
    
    // Wait for form transition to complete
    await page.waitForLoadState('networkidle');
    
    // Wait for password reset form to appear
    await loginPage.resetEmailInput.waitFor({ state: 'visible' });
    await loginPage.verifyEmailButton.waitFor({ state: 'visible' });
    
    // Verify password reset form elements are visible (direct check)
    await expect(loginPage.resetEmailInput).toBeVisible();
    await expect(loginPage.verifyEmailButton).toBeVisible();
    
    // Fill email and click verify
    await loginPage.resetEmailInput.fill(ADMIN_EMAIL);
    await loginPage.verifyEmailButton.click();
    await page.waitForLoadState('networkidle');
    
    // Verify success - should still be on login page
    await expect(page).toHaveURL(/login/);
  });


  test('LOGIN-TC-007: User cannot login with empty email and password fields', async ({ page }) => {
    await loginWithEmptyFields(page);
  });


  test('LOGIN-TC-008: User cannot login with an invalid email format (client-side)', async ({ page }) => {
    await loginPage.testInvalidEmailFormat('notanemail');
  });


  test('LOGIN-TC-009: User cannot login with empty email field only', async ({ page }) => {
    await loginWithEmptyEmail(page, ATTENDEE_PASSWORD);
  });


  test('LOGIN-TC-010: User cannot login with empty password field only', async ({ page }) => {
    await loginWithEmptyPassword(page, ATTENDEE_EMAIL);
  });


  test('LOGIN-TC-011: User can clear form fields', async ({ page }) => {
    await loginPage.emailInput.fill(ATTENDEE_EMAIL);
    await loginPage.passwordInput.fill(ATTENDEE_PASSWORD);
    await loginPage.clearForm();
    await expect(loginPage.emailInput).toHaveValue('');
    await expect(loginPage.passwordInput).toHaveValue('');
  });

  
  test('LOGIN-TC-012: Navigate to registration page', async ({ page }) => {
    const isRegisterLinkVisible = await loginPage.createAccountButton.isVisible();
    
    if (!isRegisterLinkVisible) {
      test.skip();
    }
    
    await loginPage.goToRegistration();
    
    await expect(page).toHaveURL(/registration|register|signup/);
  });

  test('LOGIN-TC-013: Different error types validation', async ({ page }) => {
    // Test 1: Valid email format that exists in system but wrong password
    await loginPage.loginAndValidateError('admin@email.com', 'wrongpassword123');
    await loginPage.validateInvalidCredentialsError();
    
    // Clear form and wait for page to settle
    await loginPage.clearForm();
    await page.waitForLoadState('networkidle');
    
    // Test 2: Email that doesn't exist in system  
    await loginPage.loginAndValidateError('nonexistent@test.com', 'anypassword');
    await loginPage.validateEmailNotFoundError();
  });

  test.skip('LOGIN-TC-014: Rate limiting validation after multiple failed attempts', async ({ page }) => {
    // This test demonstrates rate limiting error validation
    // Note: Rate limiting triggers after 7 failed attempts with non-existent email
    // Skipped by default to avoid triggering rate limits in CI
    
    // 7 failed attempts required to trigger rate limiting
    for (let i = 1; i <= 7; i++) {
      await loginPage.emailInput.fill('test@invalid.com');
      await loginPage.passwordInput.fill('wrongpassword');
      await loginPage.loginButton.click();
      await page.waitForLoadState('networkidle');
    }
    
    // Validate that rate limiting error is now displayed
    await loginPage.validateRateLimitError();
  });
}); 