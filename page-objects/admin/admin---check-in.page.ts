import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Represents the Admin - Check-In page.
 * Provides methods to interact with elements on the Admin - Check-In page.
 */
export class AdminCheckInPage extends BasePage {
  readonly title = 'Admin - Check-In';
  // Add locators and methods for the Admin - Check-In page here

  /**
   * Initializes a new instance of the AdminCheckInPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    // Initialize locators for the Admin - Check-In page here
  }
} 