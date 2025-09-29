import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Represents the Admin Menu page.
 * Provides methods to interact with elements on the Admin Menu page.
 */
export class AdminMenuPage extends BasePage {
  readonly manageAgendaLink: Locator;
  readonly manageUsersLink: Locator;
  // Add other admin menu links here

  /**
   * Initializes a new instance of the AdminMenuPage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    super(page);
    this.manageAgendaLink = this.page.getByRole('link', { name: 'Manage Agenda' });
    this.manageUsersLink = this.page.getByRole('link', { name: 'Manage Users' });
    // Initialize other admin menu links here
  }
} 