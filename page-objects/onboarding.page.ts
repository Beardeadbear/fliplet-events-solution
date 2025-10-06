import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { BASE_URL } from '../test-data/app.data';

/**
 * Represents the Onboarding page.
 * Provides methods to interact with elements on the Onboarding page.
 */
export class OnboardingPage extends BasePage {
  // Define locators for onboarding flow elements
  public readonly exploreMoreButton: Locator;
  public readonly continueButtons: Locator;
  public readonly getStartedButton: Locator;
  public readonly allowNotificationsButton: Locator;
  public readonly dontAllowButton: Locator;
  public readonly remindMeLaterButton: Locator;

  constructor(page: Page) {
    super(page);

    // Use more flexible selectors based on MCP analysis
    this.exploreMoreButton = page.locator('button:has-text("Explore More")');
    this.continueButtons = page.locator('button[data-button-action="next-slide"]');
    this.getStartedButton = page.locator('button:has-text("Get Started")');
    
    // Notification permission buttons
    this.allowNotificationsButton = page.locator('button:has-text("Allow notifications")');
    this.dontAllowButton = page.locator('button:has-text("Don\'t allow")');
    this.remindMeLaterButton = page.locator('button:has-text("Remind me later")');
  }

  /**
   * Overrides the base goto method to navigate directly to the application's root,
   * as the onboarding flow is the entry point.
   */
  async goto() {
    await this.page.goto(BASE_URL);
  }

  /**
   * Completes the entire onboarding flow including carousel slides and notification permissions.
   * Based on MCP analysis findings - handles complex Swiper.js carousel and dynamic elements.
   */
  async completeOnboarding(): Promise<void> {
    try {
      // Step 1: Wait for onboarding to load and click "Explore More"
      await this.exploreMoreButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.exploreMoreButton.click();
      await this.page.waitForTimeout(500); // Small delay for carousel transition

      // Step 2: Handle all "Continue" buttons in the carousel
      const continueButtonCount = await this.continueButtons.count();
      console.log(`Found ${continueButtonCount} continue buttons`);
      
      for (let i = 0; i < continueButtonCount; i++) {
        try {
          const button = this.continueButtons.nth(i);
          await button.waitFor({ state: 'visible', timeout: 5000 });
          await button.click();
          await this.page.waitForTimeout(500); // Delay between slides
        } catch (error) {
          console.log(`Continue button ${i + 1} not clickable, continuing...`);
          // Continue with next button if one fails
        }
      }

      // Step 3: Handle "Get Started" button if present
      try {
        await this.getStartedButton.waitFor({ state: 'visible', timeout: 3000 });
        await this.getStartedButton.click();
        await this.page.waitForTimeout(500);
      } catch (error) {
        console.log('Get Started button not found or not needed');
      }

      // Step 4: Handle notification permission prompt
      await this.handleNotificationPrompt();

      // Step 5: Wait for login form to be ready
      await this.waitForLoginForm();

    } catch (error) {
      console.error('Error during onboarding completion:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(`Onboarding failed: ${errorMessage}`);
    }
  }

  /**
   * Handles notification permission prompt by clicking "Don't allow" to avoid interruptions.
   */
  private async handleNotificationPrompt(): Promise<void> {
    try {
      // Wait for notification prompt to appear
      await this.dontAllowButton.waitFor({ state: 'visible', timeout: 5000 });
      await this.dontAllowButton.click();
      console.log('Clicked "Don\'t allow" for notifications');
      await this.page.waitForTimeout(500);
    } catch (error) {
      console.log('Notification prompt not found or already handled');
    }
  }

  /**
   * Waits for the login form to be ready after onboarding completion.
   */
  private async waitForLoginForm(): Promise<void> {
    try {
      // Wait for email input field to be visible (indicates login form is ready)
      await this.page.waitForSelector('input[type="email"], input[name="Email"]', { 
        state: 'visible', 
        timeout: 10000 
      });
      console.log('Login form is ready');
    } catch (error) {
      console.log('Login form not found, but onboarding may still be complete');
    }
  }

  /**
   * Alternative method to skip onboarding entirely (for tests that don't need onboarding).
   */
  async skipOnboarding(): Promise<void> {
    try {
      // Try to navigate directly to login if possible
      await this.page.goto(`${BASE_URL}#login`);
      await this.waitForLoginForm();
    } catch (error) {
      console.log('Could not skip onboarding, falling back to complete flow');
      await this.completeOnboarding();
    }
  }
}