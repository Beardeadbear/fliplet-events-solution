import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Represents the My Meetings page.
 * Provides methods to interact with elements on the My Meetings page.
 */
export class MyMeetingsPage extends BasePage {
  readonly title = 'My Meetings';
  readonly meetingsList: Locator;
  readonly meetingItems: Locator;

  /**
   * Initializes a new instance of the MyMeetingsPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    this.meetingsList = this.page.locator('.meetings-list');
    this.meetingItems = this.page.locator('.meeting-list-item');
  }
} 