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
  public readonly slide4ContinueButton: Locator;
  public readonly slide6ContinueButton: Locator;
  public readonly getStartedButton: Locator;

  constructor(page: Page) {
    super(page);

    this.exploreMoreButton = page.getByRole('button', { name: 'Explore More' });
    this.slide4ContinueButton = page.getByLabel('Slide 4', { exact: true }).getByText('Continue');
    this.slide6ContinueButton = page.getByLabel('Slide 6').getByText('Continue');
    this.getStartedButton = page.getByText('Let\'s get started!');
  }

  /**
   * Overrides the base goto method to navigate directly to the application's root,
   * as the onboarding flow is the entry point.
   */
  async goto() {
    await this.page.goto(BASE_URL);
  }

  /**
   * Completes the onboarding flow by clicking through carousel slides.
   */
  async completeOnboarding(): Promise<void> {
    // Check if onboarding is needed (Explore More button exists)
    if (await this.exploreMoreButton.isVisible()) {
      await this.exploreMoreButton.click();
      await this.slide4ContinueButton.click();
      await this.slide6ContinueButton.click();
      await this.getStartedButton.click();
    }
    
    // Wait for login form to be ready
    await this.page.getByRole('textbox', { name: 'Email' }).waitFor();  // Wait for login form to be ready
  }
}