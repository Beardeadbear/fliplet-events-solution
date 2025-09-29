import { Page } from '@playwright/test';
import { BASE_URL } from '../test-data/app.data';

/**
 * Page Manager - Centralizes navigation logic and URL management
 * Provides consistent methods for navigating to different pages
 */
export class PageManager {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the application's root URL (onboarding/entry point)
   */
  async goToAppRoot(): Promise<void> {
    await this.page.goto(BASE_URL);
  }

  /**
   * Navigate to the Home page (after authentication)
   * This is the main landing page after login
   */
  async goToHomePage(): Promise<void> {
    await this.page.goto(BASE_URL);
  }

  /**
   * Navigate to a specific page using its slug
   * @param slug The page slug (e.g., 'agenda', 'meetings', 'admin')
   */
  async goToPage(slug: string): Promise<void> {
    await this.page.goto(`${BASE_URL}/${slug}`);
  }

  /**
   * Get the current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
} 