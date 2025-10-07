import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Represents the Edit profile page.
 * Provides methods to interact with elements on the Edit profile page.
 */
export class EditProfilePage extends BasePage {
  readonly title = 'Edit profile';
  // Add locators and methods for the Edit profile page here

  /**
   * Initializes a new instance of the EditProfilePage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    // Initialize locators for the Edit profile page here
  }
} 