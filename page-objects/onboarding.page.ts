import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { BASE_URL } from '../test-data/app.data';

/**
 * Represents the Onboarding page.
 * Provides methods to interact with elements on the Onboarding page.
 */
export class OnboardingPage extends BasePage {
  // Define locators for all possible buttons in the flow
  public readonly exploreMoreButton: Locator;
  public readonly continueButtonOne: Locator;
  public readonly continueButtonTwo: Locator;
  public readonly getStartedButton: Locator;

  constructor(page: Page) {
    super(page);

    this.exploreMoreButton = page.getByRole('button', { name: 'Explore More' });
    this.continueButtonOne = page.getByLabel('Slide 4', { exact: true }).getByRole('button', { name: 'Continue' });
    this.continueButtonTwo = page.getByLabel('Slide 6').getByText('Continue')
    this.getStartedButton = page.getByText('Let\'s get started!')
  }

  /**
   * Overrides the base goto method to navigate directly to the application's root,
   * as the onboarding flow is the entry point.
   */
  async goto() {
    await this.page.goto(BASE_URL);
  }

  /**
   * Navigates to the page and completes the entire multi-step onboarding flow.
   */
  async completeOnboarding() {
    // Wait for the first button to be ready before starting
    await this.exploreMoreButton.waitFor({ state: 'visible' });
    await this.exploreMoreButton.click();
    await this.continueButtonOne.click();
    await this.continueButtonTwo.click();
    await this.getStartedButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}