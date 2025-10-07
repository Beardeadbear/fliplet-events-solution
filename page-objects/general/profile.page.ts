import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Profile page object containing all locators and actions for the user profile screen
 */
export class ProfilePage extends BasePage {
  readonly myCodeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.myCodeButton = page.getByRole('button', { name: /My Code/ });
  }
}
