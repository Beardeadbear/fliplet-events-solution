import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Represents the Universal Search page.
 * Provides methods to interact with elements on the Universal Search page.
 */
export class UniversalSearchPage extends BasePage {
  readonly title = 'Universal Search';
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly resultsContainer: Locator;

  /**
   * Initializes a new instance of the UniversalSearchPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    this.searchInput = this.page.getByPlaceholder('Search...');
    this.searchButton = this.page.getByRole('button', { name: 'Search' });
    this.resultsContainer = this.page.locator('.results-container');
  }
} 