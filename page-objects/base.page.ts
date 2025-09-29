import { Page } from '@playwright/test';

/**
 * Represents the base page for all page objects.
 * It provides the common page property that can be shared across different pages.
 */
export abstract class BasePage {
  protected page: Page;

  /**
   * Initializes a new instance of the BasePage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
  }
} 