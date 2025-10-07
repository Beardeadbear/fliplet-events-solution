import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

/**
 * Represents the Notifications page.
 * Provides methods to interact with elements on the Notifications page.
 */
export class NotificationsPage extends BasePage {
  readonly title = 'Notifications';
  readonly notificationList: Locator;
  readonly notificationItems: Locator;
  readonly allowNotificationsButton: Locator;
  readonly dontAllowButton: Locator;
  readonly remindMeLaterButton: Locator;

  /**
   * Initializes a new instance of the NotificationsPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    this.notificationList = this.page.locator('.notification-list');
    this.notificationItems = this.page.locator('.notification-list-item');
    this.allowNotificationsButton = this.page.getByRole('button', { name: 'Allow Notifications' });
    this.dontAllowButton = this.page.getByRole('button', { name: `Don't Allow` });
    this.remindMeLaterButton = this.page.getByRole('button', { name: 'Remind me later' });
  }
} 