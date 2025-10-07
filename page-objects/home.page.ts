import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { BASE_URL } from '../test-data/app.data';
import { NavigationMenu } from './general/navigation-menu.page';

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
   * Wait for the Home page to load completely by checking key UI elements.
   * 
   * This method ensures the core Home page elements are visible before proceeding:
   * - Event title (confirms we're on the right event)
   * - Welcome message (confirms user is authenticated)
   * - Check In button (confirms main functionality is available)
   * 
   * @example
   * ```ts
   * await homePage.waitForPageLoad();
   * // Now safe to interact with Home page elements
   * ```
   */
  async waitForPageLoad(): Promise<void> {
    await this.eventTitle.waitFor({ state: 'visible' });
    await this.welcomeMessage.waitFor({ state: 'visible' });
    await this.checkInButton.waitFor({ state: 'visible' });
  }
  /**
   * Handle push notification popup if it appears on the Home page.
   * 
   * This method detects and dismisses the browser push notification permission dialog
   * that may appear after login. It uses scoped selectors within the popup to avoid
   * clicking wrong buttons elsewhere on the page.
   * 
   * @param action - Which button to click: 'allow', 'dont-allow', or 'remind-later'
   * @default 'allow'
   * 
   * @example
   * ```ts
   * // Allow notifications (default)
   * await homePage.handlePushNotifications();
   * 
   * // Explicitly deny notifications
   * await homePage.handlePushNotifications('dont-allow');
   * 
   * // Postpone the decision
   * await homePage.handlePushNotifications('remind-later');
   * ```
   */
  async handlePushNotifications(action: 'allow' | 'dont-allow' | 'remind-later' = 'allow'): Promise<void> {
    const popup = this.pushNotificationPopup;

    // Try to detect the popup becoming visible briefly
    const appeared = await popup
      .waitFor({ state: 'visible', timeout: 4000 })
      .then(() => true)
      .catch(() => false);

    if (!appeared) {
      // No popup to handle
      return;
    }

    // Scope buttons to the popup to avoid accidental matches elsewhere
    const allowBtn = popup.getByRole('button', { name: 'Allow notifications' });
    const dontAllowBtn = popup.getByRole('button', { name: "Don't allow" });
    const remindBtn = popup.getByRole('button', { name: 'Remind me later' });

    try {
      switch (action) {
        case 'allow':
          if (await allowBtn.isVisible()) {
            await allowBtn.click();
            break;
          }
          // Fallback to other options if preferred one is not visible
          if (await dontAllowBtn.isVisible()) { await dontAllowBtn.click(); break; }
          if (await remindBtn.isVisible()) { await remindBtn.click(); break; }
          break;
        case 'dont-allow':
          if (await dontAllowBtn.isVisible()) {
            await dontAllowBtn.click();
            break;
          }
          if (await allowBtn.isVisible()) { await allowBtn.click(); break; }
          if (await remindBtn.isVisible()) { await remindBtn.click(); break; }
          break;
        case 'remind-later':
          if (await remindBtn.isVisible()) {
            await remindBtn.click();
            break;
          }
          if (await dontAllowBtn.isVisible()) { await dontAllowBtn.click(); break; }
          if (await allowBtn.isVisible()) { await allowBtn.click(); break; }
          break;
      }
    } finally {
      // Ensure we wait for the popup to be gone, but don't fail the flow if it lingers
      await popup.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    }
  }

  /**
   * Allow push notifications - convenience method for handlePushNotifications('allow').
   * 
   * This is a shorthand for clicking "Allow notifications" on the permission dialog.
   * Use this when you want to explicitly allow notifications in your test.
   * 
   * @example
   * ```ts
   * await homePage.allowPushNotifications();
   * // Equivalent to: await homePage.handlePushNotifications('allow');
   * ```
   */
  async allowPushNotifications(): Promise<void> {
    await this.handlePushNotifications('allow');
  }

  /**
   * Don't allow push notifications - convenience method for handlePushNotifications('dont-allow').
   * 
   * This is a shorthand for clicking "Don't allow" on the permission dialog.
   * Use this when you want to explicitly deny notifications in your test.
   * 
   * @example
   * ```ts
   * await homePage.dontAllowPushNotifications();
   * // Equivalent to: await homePage.handlePushNotifications('dont-allow');
   * ```
   */
  async dontAllowPushNotifications(): Promise<void> {
    await this.handlePushNotifications('dont-allow');
  }

  /**
   * Remind me later for push notifications - convenience method for handlePushNotifications('remind-later').
   * 
   * This is a shorthand for clicking "Remind me later" on the permission dialog.
   * Use this when you want to postpone the notification decision in your test.
   * 
   * @example
   * ```ts
   * await homePage.remindMeLaterPushNotifications();
   * // Equivalent to: await homePage.handlePushNotifications('remind-later');
   * ```
   */
  async remindMeLaterPushNotifications(): Promise<void> {
    await this.handlePushNotifications('remind-later');
  }

  /**
   * Check if push notification popup is currently visible on the page.
   * 
   * This method returns a boolean indicating whether the notification permission
   * dialog is present. Useful for conditional logic in tests.
   * 
   * @returns Promise<boolean> - true if popup is visible, false otherwise
   * 
   * @example
   * ```ts
   * if (await homePage.isPushNotificationPopupVisible()) {
   *   await homePage.dontAllowPushNotifications();
   * }
   * ```
   */
  async isPushNotificationPopupVisible(): Promise<boolean> {
    return await this.pushNotificationPopup.isVisible();
  }



  /**
   * Click the Check In button to generate QR code for event check-in.
   * 
   * This method handles the main check-in functionality. It automatically handles
   * any push notification popup that might appear before clicking the button.
   * After clicking, a QR code modal should appear for scanning.
   * 
   * @example
   * ```ts
   * await homePage.clickCheckIn();
   * // QR code modal should now be visible
   * ```
   */
  async clickCheckIn(): Promise<void> {
    // Handle push notifications first if they appear
    await this.handlePushNotifications();
    await this.checkInButton.click();
  }

  /**
   * Click on a specific agenda item by its index position.
   * 
   * This method clicks on an agenda/session item from the upcoming sessions list.
   * The index is 0-based, so first item is index 0, second is index 1, etc.
   * Clicking an agenda item typically opens a detail overlay with session information.
   * 
   * @param index - Zero-based index of the agenda item to click
   * 
   * @example
   * ```ts
   * await homePage.clickAgendaItem(0); // Click first agenda item
   * await homePage.clickAgendaItem(2); // Click third agenda item
   * ```
   */
  async clickAgendaItem(index: number): Promise<void> {
    const agendaItem = this.agendaItems.nth(index);
    await agendaItem.click();
  }

  /**
   * Click the "See More" button to expand the upcoming sessions list.
   * 
   * This method clicks the button that expands the agenda/sessions list to show
   * more items beyond the initially visible ones. Useful for testing pagination
   * or expanding content functionality.
   * 
   * @example
   * ```ts
   * await homePage.clickSeeMore();
   * // More agenda items should now be visible
   * ```
   */
  async clickSeeMore(): Promise<void> {
    await this.seeMoreButton.click();
  }







  /**
   * Verify the Home page is loaded correctly by checking all key elements.
   * 
   * This method performs comprehensive validation that the Home page has loaded
   * successfully. It checks for:
   * - Event title visibility
   * - Welcome message presence
   * - Check In button availability
   * - Upcoming sessions section
   * - Navigation menu loaded state
   * 
   * Use this for assertions in tests to ensure the page is fully functional.
   * 
   * @example
   * ```ts
   * await homePage.verifyHomePageLoaded();
   * // All key Home page elements are confirmed visible
   * ```
   */
  async verifyHomePageLoaded(): Promise<void> {
    await expect(this.eventTitle).toBeVisible();
    await expect(this.welcomeMessage).toBeVisible();
    await expect(this.checkInButton).toBeVisible();
    await expect(this.upcomingSessionsTitle).toBeVisible();
    await this.navigationMenu.waitForNavigationLoad();
  }

  /**
   * Verify user is logged in by checking the user name element.
   * 
   * This method validates that a user is properly authenticated by checking
   * that the userName element contains actual user data (not the default
   * placeholder "John Doe"). This confirms the login was successful and
   * user data is loaded.
   * 
   * @example
   * ```ts
   * await homePage.verifyUserLoggedIn();
   * // Confirms user is authenticated with real data
   * ```
   */
  async verifyUserLoggedIn(): Promise<void> {
    const userName = await this.userName.textContent();
    expect(userName).toBeTruthy();
    expect(userName).not.toBe('John Doe'); // Default placeholder name
  }


} 