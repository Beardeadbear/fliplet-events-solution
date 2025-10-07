import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Represents the Discussions page.
 * Provides methods to interact with elements on the Discussions page.
 */
export class DiscussionsPage extends BasePage {
  readonly title = 'Discussions';
  readonly discussionList: Locator;
  readonly discussionItems: Locator;
  readonly newDiscussionButton: Locator;

  /**
   * Initializes a new instance of the DiscussionsPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    this.discussionList = this.page.locator('.discussion-list');
    this.discussionItems = this.page.locator('.discussion-list-item');
    this.newDiscussionButton = this.page.getByRole('button', { name: 'New Discussion' });
  }
} 