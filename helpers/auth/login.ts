// helpers/auth/login.ts

import { Page, expect } from '@playwright/test';
import { LoginPage } from '../../page-objects/login.page';
import { HomePage } from '../../page-objects/home.page';
import { 
  ADMIN_EMAIL, 
  ADMIN_PASSWORD, 
  ATTENDEE_EMAIL, 
  ATTENDEE_PASSWORD,
  SPEAKER_EMAIL,
  SPEAKER_PASSWORD,
  EXHIBITOR_EMAIL,
  EXHIBITOR_PASSWORD
} from '../../test-data/app.data';

/**
 * Login as Admin user (onboarding should be completed separately)
 * @param page - Playwright Page instance
 */
export async function loginAsAdmin(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login(ADMIN_EMAIL, ADMIN_PASSWORD);
  
  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');
  
  // Handle push notifications if they appear
  try {
    await homePage.allowPushNotifications();
  } catch (error) {
    // Push notifications might not appear, that's okay
    console.log('Push notifications not found or already handled');
  }
}

/**
 * Login as Attendee user (onboarding should be completed separately)
 * @param page - Playwright Page instance
 */
export async function loginAsAttendee(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login(ATTENDEE_EMAIL, ATTENDEE_PASSWORD);
  
  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');
  
  // Handle push notifications if they appear
  try {
    await homePage.allowPushNotifications();
  } catch (error) {
    // Push notifications might not appear, that's okay
    console.log('Push notifications not found or already handled');
  }
}

/**
 * Login as Speaker user (onboarding should be completed separately)
 * @param page - Playwright Page instance
 */
export async function loginAsSpeaker(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login(SPEAKER_EMAIL, SPEAKER_PASSWORD);
  
  // Handle push notifications if they appear
  try {
    await homePage.allowPushNotifications();
  } catch (error) {
    // Push notifications might not appear, that's okay
    console.log('Push notifications not found or already handled');
  }
}

/**
 * Login as Exhibitor user (onboarding should be completed separately)
 * @param page - Playwright Page instance
 */
export async function loginAsExhibitor(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login(EXHIBITOR_EMAIL, EXHIBITOR_PASSWORD);
  
  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');
  
  // Handle push notifications if they appear
  try {
    await homePage.allowPushNotifications();
  } catch (error) {
    // Push notifications might not appear, that's okay
    console.log('Push notifications not found or already handled');
  }
}

/**
 * Attempts login with invalid password (valid email, wrong password)
 * @param page - Playwright Page instance
 * @param email - Valid email address
 * @param invalidPassword - Wrong password
 */
export async function loginWithInvalidPassword(page: Page, email: string, invalidPassword: string): Promise<void> {
  const loginPage = new LoginPage(page);
  
  await loginPage.loginAndValidateError(email, invalidPassword);
}

/**
 * Attempts login with non-existent email
 * @param page - Playwright Page instance
 * @param nonExistentEmail - Email that doesn't exist in system
 * @param password - Any password
 */
export async function loginWithNonExistentEmail(page: Page, nonExistentEmail: string, password: string): Promise<void> {
  const loginPage = new LoginPage(page);
  
  await loginPage.loginAndValidateError(nonExistentEmail, password);

  await expect(page).toHaveURL(/login/);
}

/**
 * Attempts login with empty email and password fields
 * @param page - Playwright Page instance
 */
export async function loginWithEmptyFields(page: Page): Promise<void> {
  const loginPage = new LoginPage(page);
  
  // Don't fill any fields, just click login button
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
  await loginPage.loginButton.click();
  
  // Should stay on login page (form validation should prevent submission)
  await expect(page).toHaveURL(/login/);
}

/**
 * Attempts login with empty email field only
 * @param page - Playwright Page instance
 * @param password - Valid password
 */
export async function loginWithEmptyEmail(page: Page, password: string): Promise<void> {
  const loginPage = new LoginPage(page);
  
  // Fill only password, leave email empty
  await loginPage.passwordInput.fill(password);
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
  await loginPage.loginButton.click();
  
  // Should stay on login page (form validation should prevent submission)
  await expect(page).toHaveURL(/login/);
}

/**
 * Attempts login with empty password field only
 * @param page - Playwright Page instance
 * @param email - Valid email address
 */
export async function loginWithEmptyPassword(page: Page, email: string): Promise<void> {
  const loginPage = new LoginPage(page);
  
  // Fill only email, leave password empty
  await loginPage.emailInput.fill(email);
  await expect(loginPage.loginButton).toBeVisible();
  await expect(loginPage.loginButton).toBeEnabled();
  await loginPage.loginButton.click();
  
  // Should stay on login page (form validation should prevent submission)
  await expect(page).toHaveURL(/login/);
}

