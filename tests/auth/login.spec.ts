import { test, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login.page';
import { OnboardingPage } from '../../page-objects/onboarding.page';
import { HomePage } from '../../page-objects/home.page';
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
    const onboardingPage = new OnboardingPage(page);
    await onboardingPage.goto();
    await onboardingPage.completeOnboarding();
    
    // The application should now be on the login page. We just need to instantiate it.
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
  });

  test('LOGIN-TC-001: Successful Admin login', async ({ page }) => {
    await loginPage.login(ADMIN_EMAIL, ADMIN_PASSWORD);
    await homePage.allowPushNotifications(); 
  });
  
  test('LOGIN-TC-002: Successful Internal Member login', async ({ page }) => {
    await loginPage.login(ATTENDEE_EMAIL, ATTENDEE_PASSWORD);
    await homePage.allowPushNotifications();
  });


  test('LOGIN-TC-003: Login fails with invalid password', async ({ page }) => {
    await loginPage.loginAndValidateError(ADMIN_EMAIL, INVALID_PASSWORD);
    // Since ADMIN_EMAIL exists in system, expect "email or password don't match" error
    await loginPage.validateInvalidCredentialsError();
  });


  test('LOGIN-TC-004: Login fails with a non-existent email', async ({ page }) => {
    await loginPage.loginAndValidateError(INVALID_EMAIL, INVALID_PASSWORD);
    // Since INVALID_EMAIL doesn't exist in system, expect "email address could not be found" error
    await loginPage.validateEmailNotFoundError();
  });


  test('LOGIN-TC-005: User can initiate password reset', async ({ page }) => {
    await loginPage.resetPassword(ATTENDEE_EMAIL);
    
    // Verify we're in password reset state
    await expect(loginPage.isInPasswordResetState()).resolves.toBe(true);
    
    // Verify reset email input is visible and contains the email
    await expect(loginPage.resetEmailInput).toBeVisible();
    await expect(loginPage.resetEmailInput).toHaveValue(ATTENDEE_EMAIL);
  });

  test('LOGIN-TC-006: User can access Forgot Password and see reset flow', async ({ page }) => {
    // First verify we're in login state
    await expect(loginPage.isInLoginState()).resolves.toBe(true);
    
    // Initiate password reset
    await loginPage.resetPassword(ADMIN_EMAIL);
    
    // Wait for the password reset request to complete
    await page.waitForLoadState('networkidle');
    
    // Verify we switched to password reset state
    await expect(loginPage.isInPasswordResetState()).resolves.toBe(true);
    await expect(loginPage.verifyEmailButton).toBeVisible();
  });


  test('LOGIN-TC-007: User cannot login with empty email and password fields', async ({ page }) => {
    await loginPage.validateEmptyFormSubmission();
  });


  test('LOGIN-TC-008: User cannot login with an invalid email format (client-side)', async ({ page }) => {
    await loginPage.testInvalidEmailFormat('notanemail');
  });


  test('LOGIN-TC-009: User cannot login with empty email field only', async ({ page }) => {
    await loginPage.passwordInput.fill('somepassword');
    await loginPage.loginButton.click();
    await loginPage.validateEmailRequired();
  });


  test('LOGIN-TC-010: User cannot login with empty password field only', async ({ page }) => {
    await loginPage.emailInput.fill(ATTENDEE_EMAIL);
    await loginPage.loginButton.click();
    await loginPage.validatePasswordRequired();
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