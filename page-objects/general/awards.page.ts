import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Represents the Awards page.
 * Provides methods to interact with elements on the Awards page.
 */
export class AwardsPage extends BasePage {
  readonly title = 'Awards';
  readonly awardsList: Locator;
  readonly awardItems: Locator;

  /**
   * Initializes a new instance of the AwardsPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    this.awardsList = this.page.locator('.awards-list');
    this.awardItems = this.page.locator('.award-list-item');
  }
} 