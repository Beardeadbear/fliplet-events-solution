import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Represents the Exhibitors page.
 * Provides methods to interact with elements on the Exhibitors page.
 */
export class ExhibitorsPage extends BasePage {
  readonly title = 'Exhibitors';
  readonly exhibitorsList: Locator;
  readonly exhibitorItems: Locator;

  /**
   * Initializes a new instance of the ExhibitorsPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    this.exhibitorsList = this.page.locator('.exhibitors-list');
    this.exhibitorItems = this.page.locator('.exhibitor-list-item');
  }
} 