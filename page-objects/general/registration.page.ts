import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Represents the Registration page.
 * Provides methods to interact with elements on the Registration page.
 */
export class RegistrationPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  /**
   * Initializes a new instance of the RegistrationPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    this.emailInput = this.page.getByLabel('Email');
    this.passwordInput = this.page.getByLabel('Password');
    this.confirmPasswordInput = this.page.getByLabel('Confirm Password');
    this.registerButton = this.page.getByRole('button', { name: 'Register' });
  }
} 