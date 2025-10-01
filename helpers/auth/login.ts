// helpers/auth/login.ts

import { Page } from '@playwright/test';
import { LoginPage } from '../../page-objects/login.page';
import { HomePage } from '../../page-objects/home.page';
import { OnboardingPage } from '../../page-objects/onboarding.page';
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
 * Complete login flow for Admin user
 * Handles onboarding, login, and post-login setup
 * @param page - Playwright Page instance
 */
export async function loginAsAdmin(page: Page): Promise<void> {
  const onboardingPage = new OnboardingPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await onboardingPage.goto();
  await onboardingPage.completeOnboarding();
  await loginPage.login(ADMIN_EMAIL, ADMIN_PASSWORD);
  await homePage.waitForPageLoad();
  await homePage.allowPushNotifications();
}

/**
 * Complete login flow for Attendee user
 * Handles onboarding, login, and post-login setup
 * @param page - Playwright Page instance
 */
export async function loginAsAttendee(page: Page): Promise<void> {
  const onboardingPage = new OnboardingPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await onboardingPage.goto();
  await onboardingPage.completeOnboarding();
  await loginPage.login(ATTENDEE_EMAIL, ATTENDEE_PASSWORD);
  await homePage.waitForPageLoad();
  await homePage.allowPushNotifications();
}

/**
 * Complete login flow for Speaker user
 * Handles onboarding, login, and post-login setup
 * @param page - Playwright Page instance
 */
export async function loginAsSpeaker(page: Page): Promise<void> {
  const onboardingPage = new OnboardingPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await onboardingPage.goto();
  await onboardingPage.completeOnboarding();
  await loginPage.login(SPEAKER_EMAIL, SPEAKER_PASSWORD);
  await homePage.waitForPageLoad();
  await homePage.allowPushNotifications();
}

/**
 * Complete login flow for Exhibitor user
 * Handles onboarding, login, and post-login setup
 * @param page - Playwright Page instance
 */
export async function loginAsExhibitor(page: Page): Promise<void> {
  const onboardingPage = new OnboardingPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await onboardingPage.goto();
  await onboardingPage.completeOnboarding();
  await loginPage.login(EXHIBITOR_EMAIL, EXHIBITOR_PASSWORD);
  await homePage.waitForPageLoad();
  await homePage.allowPushNotifications();
}

/**
 * Generic login function with custom credentials
 * Handles onboarding, login, and post-login setup
 * @param page - Playwright Page instance
 * @param username - Username/email
 * @param password - Password
 */
export async function loginWithCredentials(page: Page, username: string, password: string): Promise<void> {
  const onboardingPage = new OnboardingPage(page);
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await onboardingPage.goto();
  await onboardingPage.completeOnboarding();
  await loginPage.login(username, password);
  await homePage.waitForPageLoad();
  await homePage.allowPushNotifications();
}

/**
 * Login without onboarding (for tests that skip onboarding)
 * @param page - Playwright Page instance
 * @param username - Username/email
 * @param password - Password
 */
export async function loginDirectly(page: Page, username: string, password: string): Promise<void> {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login(username, password);
  await homePage.waitForPageLoad();
  await homePage.allowPushNotifications();
}
