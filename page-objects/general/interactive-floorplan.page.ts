import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Represents the Interactive floorplan page.
 * Provides methods to interact with elements on the Interactive floorplan page.
 */
export class InteractiveFloorplanPage extends BasePage {
  readonly title = 'Interactive floorplan';
  // Add locators and methods for the Interactive floorplan page here

  /**
   * Initializes a new instance of the InteractiveFloorplanPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    // Initialize locators for the Interactive floorplan page here
  }
} 