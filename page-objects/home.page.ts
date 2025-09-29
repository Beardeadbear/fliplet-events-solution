import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { BASE_URL } from '../test-data/app.data';
import { NavigationMenu } from './navigation-menu.page';

/**
 * Home page object containing all locators and actions for the Home screen
 */
export class HomePage extends BasePage {
  // Header and Welcome Section
  readonly eventTitle: Locator;
  readonly welcomeMessage: Locator;
  readonly userName: Locator;
  readonly checkInButton: Locator;

  // News Feed Section
  readonly newsFeedContainer: Locator;
  readonly newsFeedTitle: Locator;
  readonly newsFeedImage: Locator;
  readonly newsFeedDescription: Locator;

  // Upcoming Sessions Section
  readonly upcomingSessionsTitle: Locator;
  readonly sessionDateText: Locator;
  readonly agendaContainer: Locator;
  readonly agendaItems: Locator;
  readonly seeMoreButton: Locator;

  // Navigation Menu - using separate NavigationMenu page object
  readonly navigationMenu: NavigationMenu;

  // Loading States
  readonly loadingSpinner: Locator;
  readonly noResultsMessage: Locator;

  // Push Notifications
  readonly pushNotificationPopup: Locator;
  readonly allowNotificationsButton: Locator;
  readonly dontAllowNotificationsButton: Locator;
  readonly remindMeLaterButton: Locator;

  // News Feed Detail Overlay
  readonly newsFeedDetailOverlay: Locator;
  readonly newsFeedDetailContent: Locator;
  readonly newsFeedDetailTitle: Locator;

  // QR Code Modal
  readonly qrCodeContainer: Locator;
  readonly qrCodeModal: Locator;

  // Upcoming Sessions
  readonly upcomingSessionsContainer: Locator;
  readonly upcomingSessionItems: Locator;
  readonly upcomingSessionTitle: Locator;
  readonly seeMoreSessionsButton: Locator;

  // Session Detail Overlay
  readonly sessionDetailOverlay: Locator;
  readonly sessionDetailContent: Locator;

  constructor(page: Page) {
    super(page);
    
    // Header and Welcome Section
    this.eventTitle = page.getByRole('heading', { name: 'AI Summit 2025', exact: true });
    this.welcomeMessage = page.getByRole('heading', { name: /Welcome/ }).first();
    this.userName = page.locator('#userName');
    this.checkInButton = page.getByRole('button', { name: /Check In/ });

    // News Feed Section
    this.newsFeedContainer = page.locator('.news-feed-item-content');
    this.newsFeedTitle = page.locator('.news-feed-item-title');
    this.newsFeedImage = page.getByRole('img');
    this.newsFeedDescription = page.locator('.news-feed-item-description');

    // Upcoming Sessions Section
    this.upcomingSessionsTitle = page.getByRole('heading', { name: 'Upcoming Sessions' });
    this.sessionDateText = page.locator('.session-date-text p');
    this.agendaContainer = page.locator('[data-dynamic-lists-layout="agenda"]');
    this.agendaItems = page.locator('.agenda-list-item');
    this.seeMoreButton = page.getByRole('button', { name: 'See More' });

    // Navigation Menu - using separate NavigationMenu page object
    this.navigationMenu = new NavigationMenu(page);

    // Loading States
    this.loadingSpinner = page.locator('.fa-circle-o-notch.fa-spin').first();
    this.noResultsMessage = page.locator('.no-results-holder');

    // Push Notifications
    this.pushNotificationPopup = page.locator('.popup-screen.ready');
    this.allowNotificationsButton = page.getByRole('button', { name: 'Allow notifications' });
    this.dontAllowNotificationsButton = page.getByRole('button', { name: "Don't allow" });
    this.remindMeLaterButton = page.getByRole('button', { name: 'Remind me later' });

    // News Feed Detail Overlay
    this.newsFeedDetailOverlay = page.locator('.news-feed-detail-overlay.open');
    this.newsFeedDetailContent = page.locator('.news-feed-details-content-holder');
    this.newsFeedDetailTitle = page.locator('h1, h2, h3, .news-feed-item-title');

    // QR Code Modal
    this.qrCodeContainer = page.locator('.barcode-image[data-type="qr"]');
    this.qrCodeModal = page.locator('.fl-toast-backdrop.active');

    // Upcoming Sessions
    this.upcomingSessionsContainer = page.locator('.upcoming-sessions, [class*="upcoming"], [class*="sessions"]');
    this.upcomingSessionItems = page.locator('.session-item, .agenda-item, [class*="session"]');
    this.upcomingSessionTitle = page.locator('.session-title, .agenda-title, h3, h4');
    this.seeMoreSessionsButton = page.getByRole('button', { name: /see more|view all|more sessions/i });

    // Session Detail Overlay
    this.sessionDetailOverlay = page.locator('.session-detail-overlay, .agenda-detail-overlay, [class*="detail-overlay"]');
    this.sessionDetailContent = page.locator('.session-detail-content, .agenda-detail-content, [class*="detail-content"]');
  }

  /**
   * Navigate to the app root - will redirect to Home if user is logged in
   */
  async goto(): Promise<void> {
    await this.page.goto(BASE_URL);
  }

  /**
   * Wait for the Home page to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.eventTitle.waitFor({ state: 'visible' });
    await this.welcomeMessage.waitFor({ state: 'visible' });
    await this.checkInButton.waitFor({ state: 'visible' });
    
    // Handle push notifications if they appear during page load
    await this.handlePushNotifications();
  }

  /**
   * Handle push notification popup if it appears
   */
  async handlePushNotifications(action: 'allow' | 'dont-allow' | 'remind-later' = 'allow'): Promise<void> {
    try {
      // Check if push notification popup is visible
      const isPopupVisible = await this.pushNotificationPopup.isVisible();
      
      if (isPopupVisible) {
        switch (action) {
          case 'allow':
            await this.allowNotificationsButton.click();
            break;
          case 'dont-allow':
            await this.dontAllowNotificationsButton.click();
            break;
          case 'remind-later':
            await this.remindMeLaterButton.click();
            break;
        }
        
        // Wait for popup to disappear
        await this.pushNotificationPopup.waitFor({ state: 'hidden' });
      }
    } catch (error) {
      // If popup is not visible or already handled, continue
      console.log('Push notification popup not visible or already handled');
    }
  }

  /**
   * Allow push notifications (default action)
   */
  async allowPushNotifications(): Promise<void> {
    await this.handlePushNotifications('allow');
  }

  /**
   * Don't allow push notifications
   */
  async dontAllowPushNotifications(): Promise<void> {
    await this.handlePushNotifications('dont-allow');
  }

  /**
   * Remind me later for push notifications
   */
  async remindMeLaterPushNotifications(): Promise<void> {
    await this.handlePushNotifications('remind-later');
  }

  /**
   * Check if push notification popup is visible
   */
  async isPushNotificationPopupVisible(): Promise<boolean> {
    return await this.pushNotificationPopup.isVisible();
  }



  /**
   * Click the Check In button to generate QR code
   */
  async clickCheckIn(): Promise<void> {
    // Handle push notifications first if they appear
    await this.handlePushNotifications();
    await this.checkInButton.click();
  }

  /**
   * Click on a specific agenda item by index
   */
  async clickAgendaItem(index: number): Promise<void> {
    const agendaItem = this.agendaItems.nth(index);
    await agendaItem.click();
  }

  /**
   * Click the See More button to view all sessions
   */
  async clickSeeMore(): Promise<void> {
    await this.seeMoreButton.click();
  }







  /**
   * Verify the Home page is loaded correctly
   */
  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.eventTitle).toBeVisible();
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.checkInButton).toBeVisible();
    await expect(this.upcomingSessionsTitle).toBeVisible();
    await this.navigationMenu.waitForNavigationLoad();
  }

  /**
   * Verify user is logged in by checking welcome message
   */
  async verifyUserLoggedIn(): Promise<void> {
    const userName = await this.userName.textContent();
    expect(userName).toBeTruthy();
    expect(userName).not.toBe('John Doe'); // Default placeholder name
  }


} 