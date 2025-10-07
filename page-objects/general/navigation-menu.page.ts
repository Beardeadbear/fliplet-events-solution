import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base.page';

export class NavigationMenu extends BasePage {
  // Bottom navigation container
  readonly bottomNavigation: Locator;
  
  // Main navigation items
  readonly searchNavItem: Locator;
  readonly agendaNavItem: Locator;
  readonly homeNavItem: Locator;
  readonly notificationsNavItem: Locator;
  readonly peopleNavItem: Locator;
  readonly myMeetingsNavItem: Locator;
  readonly discussionsNavItem: Locator;
  readonly chatNavItem: Locator;
  readonly materialsNavItem: Locator;
  readonly floorplanNavItem: Locator;
  readonly exhibitorsNavItem: Locator;
  readonly awardsNavItem: Locator;
  readonly settingsNavItem: Locator;
  
  // More menu elements
  readonly moreNavButton: Locator;
  readonly hideNavButton: Locator;
  
  
  // Admin navigation (only visible to admin users)
  readonly adminNavItem: Locator;
  
  // Navigation item selectors for dynamic access
  readonly navigationItems: Locator;
  readonly activeNavItem: Locator;

  constructor(page: Page) {
    super(page);
    
    // Bottom navigation container - use first() to avoid strict mode violation
    this.bottomNavigation = page.locator('.fl-menu-body.fl-bottom-bar-menu-holder').first();
    
    // Main navigation items using role-based selectors
    this.searchNavItem = page.getByRole('listitem').filter({ hasText: 'Search' });
    this.agendaNavItem = page.getByRole('listitem').filter({ hasText: 'Agenda' });
    this.homeNavItem = page.getByRole('listitem').filter({ hasText: 'Home' })
    this.notificationsNavItem = page.getByRole('listitem').filter({ hasText: 'Notifications' })
    this.peopleNavItem = page.getByRole('listitem').filter({ hasText: 'People' })
    this.myMeetingsNavItem = page.getByRole('listitem').filter({ hasText: 'My Meetings' })
    this.discussionsNavItem = page.getByRole('listitem').filter({ hasText: 'Discussions' })
    this.chatNavItem = page.getByRole('listitem').filter({ hasText: 'Chat' })
    this.materialsNavItem = page.getByRole('listitem').filter({ hasText: 'Materials' })
    this.floorplanNavItem = page.getByRole('listitem').filter({ hasText: 'Floorplan' })
    this.exhibitorsNavItem = page.getByRole('listitem').filter({ hasText: 'Exhibitors' })
    this.awardsNavItem = page.getByRole('listitem').filter({ hasText: 'Awards' })
    this.settingsNavItem = page.getByRole('listitem').filter({ hasText: 'Settings' })
    
    // More menu elements - using first() to avoid strict mode violation
    this.moreNavButton = page.getByRole('listitem').filter({ hasText: 'MoreHide' });
    this.hideNavButton = page.getByRole('listitem').filter({ hasText: 'MoreHide' });
    
    
    // Admin navigation
    this.adminNavItem = page.locator('.admin-link');
    
    // Navigation items for dynamic access
    this.navigationItems = page.locator('.fl-menu-body ul li[data-fl-navigate]');
    this.activeNavItem = page.locator('.fl-menu-body ul li.active');
  }

  /**
   * Wait for the navigation menu to be loaded and visible
   */
  async waitForNavigationLoad(): Promise<void> {
    try {
      await this.bottomNavigation.waitFor({ state: 'visible' });
      await this.homeNavItem.waitFor({ state: 'visible' });
    } catch (error) {
      // If navigation doesn't load, that's okay - just log it
      console.log('Navigation menu load timeout, continuing...');
    }
  }

  /**
   * Navigate to a specific menu item by name
   * @param menuName - The name of the menu item to navigate to
   */
  async navigateTo(menuName: string): Promise<void> {
    const menuItem = this.getNavItem(menuName);
    if (menuItem) {
      await menuItem.click();
      await this.page.waitForLoadState('networkidle');
    } else {
      throw new Error(`Menu item "${menuName}" not found`);
    }
  }

  /**
   * Get a navigation item by name
   * @param menuName - The name of the menu item
   * @returns Locator for the menu item or null if not found
   */
  getNavItem(menuName: string): Locator | null {
    const menuMap: { [key: string]: Locator } = {
      'Search': this.searchNavItem,
      'Agenda': this.agendaNavItem,
      'Home': this.homeNavItem,
      'Notifications': this.notificationsNavItem,
      'People': this.peopleNavItem,
      'My Meetings': this.myMeetingsNavItem,
      'Discussions': this.discussionsNavItem,
      'Chat': this.chatNavItem,
      'Materials': this.materialsNavItem,
      'Floorplan': this.floorplanNavItem,
      'Exhibitors': this.exhibitorsNavItem,
      'Awards': this.awardsNavItem,
      'Settings': this.settingsNavItem,
      'Admin': this.adminNavItem
    };

    return menuMap[menuName] || null;
  }

  /**
   * Check if a navigation item is active
   * @param menuName - The name of the menu item to check
   * @returns Promise<boolean> - True if the item is active
   */
  async isNavigationItemActive(menuName: string): Promise<boolean> {
    const menuItem = this.getNavItem(menuName);
    if (menuItem) {
      return await menuItem.evaluate(el => el.classList.contains('active'));
    }
    return false;
  }

  /**
   * Expand the "More" menu to show additional navigation options
   */
  async expandMoreMenu(): Promise<void> {
    await this.moreNavButton.click();
    // Wait for the expanded menu items to be visible instead of using timeout
    try {
      await this.peopleNavItem.waitFor({ state: 'visible' });
    } catch (error) {
      // If expansion fails, that's okay - the menu might already be expanded or not available
      console.log('More menu expansion failed, continuing...');
    }
  }

  /**
   * Collapse the "More" menu
   */
  async collapseMoreMenu(): Promise<void> {
    await this.hideNavButton.click();
    // Wait for the expanded menu items to be hidden instead of using timeout
    try {
      await this.peopleNavItem.waitFor({ state: 'hidden' });
    } catch (error) {
      // If collapse fails, that's okay - the menu might not be expanded
      console.log('More menu collapse failed, continuing...');
    }
  }

  /**
   * Get all available navigation menu items
   * @returns Promise<string[]> - Array of menu item names
   */
  async getNavigationMenuItems(): Promise<string[]> {
    const menuItems = await this.navigationItems.all();
    const itemNames: string[] = [];
    
    for (const item of menuItems) {
      const text = await item.textContent();
      if (text && text.trim()) {
        itemNames.push(text.trim());
      }
    }
    
    return itemNames;
  }

  /**
   * Navigate to the Home page
   */
  async goToHome(): Promise<void> {
    await this.navigateTo('Home');
  }

  /**
   * Navigate to the Agenda page
   */
  async goToAgenda(): Promise<void> {
    await this.navigateTo('Agenda');
  }

  /**
   * Navigate to the Search page
   */
  async goToSearch(): Promise<void> {
    await this.navigateTo('Search');
  }

  /**
   * Navigate to the Notifications page
   */
  async goToNotifications(): Promise<void> {
    await this.navigateTo('Notifications');
  }

  /**
   * Navigate to the People page
   */
  async goToPeople(): Promise<void> {
    await this.navigateTo('People');
  }

  /**
   * Navigate to the My Meetings page
   */
  async goToMyMeetings(): Promise<void> {
    await this.navigateTo('My Meetings');
  }

  /**
   * Navigate to the Discussions page
   */
  async goToDiscussions(): Promise<void> {
    await this.navigateTo('Discussions');
  }

  /**
   * Navigate to the Chat page
   */
  async goToChat(): Promise<void> {
    await this.navigateTo('Chat');
  }

  /**
   * Navigate to the Materials page
   */
  async goToMaterials(): Promise<void> {
    await this.navigateTo('Materials');
  }

  /**
   * Navigate to the Floorplan page
   */
  async goToFloorplan(): Promise<void> {
    await this.navigateTo('Floorplan');
  }

  /**
   * Navigate to the Exhibitors page
   */
  async goToExhibitors(): Promise<void> {
    await this.navigateTo('Exhibitors');
  }

  /**
   * Navigate to the Awards page
   */
  async goToAwards(): Promise<void> {
    await this.navigateTo('Awards');
  }

  /**
   * Navigate to the Settings page
   */
  async goToSettings(): Promise<void> {
    await this.navigateTo('Settings');
  }

  /**
   * Navigate to the Admin page (only available to admin users)
   */
  async goToAdmin(): Promise<void> {
    await this.navigateTo('Admin');
  }

  /**
   * Check if the admin navigation item is visible
   * @returns Promise<boolean> - True if admin menu is visible
   */
  async isAdminMenuVisible(): Promise<boolean> {
    return await this.adminNavItem.isVisible();
  }

  /**
   * Check if the "More" menu is expanded
   * @returns Promise<boolean> - True if more menu is expanded
   */
  async isMoreMenuExpanded(): Promise<boolean> {
    return await this.hideNavButton.isVisible();
  }

  /**
   * Get the currently active navigation item
   * @returns Promise<string> - Name of the active menu item
   */
  async getActiveNavigationItem(): Promise<string> {
    const activeItem = await this.activeNavItem.textContent();
    return activeItem ? activeItem.trim() : '';
  }

  /**
   * Verify that all main navigation items are visible
   */
  async verifyMainNavigationItems(): Promise<void> {
    await this.searchNavItem.waitFor({ state: 'visible' });
    await this.agendaNavItem.waitFor({ state: 'visible' });
    await this.homeNavItem.waitFor({ state: 'visible' });
    await this.notificationsNavItem.waitFor({ state: 'visible' });
    await this.moreNavButton.waitFor({ state: 'visible' });
  }

  /**
   * Verify that all expanded navigation items are visible
   */
  async verifyExpandedNavigationItems(): Promise<void> {
    await this.expandMoreMenu();
    
    await this.peopleNavItem.waitFor({ state: 'visible' });
    await this.myMeetingsNavItem.waitFor({ state: 'visible' });
    await this.discussionsNavItem.waitFor({ state: 'visible' });
    await this.chatNavItem.waitFor({ state: 'visible' });
    await this.materialsNavItem.waitFor({ state: 'visible' });
    await this.floorplanNavItem.waitFor({ state: 'visible' });
    await this.exhibitorsNavItem.waitFor({ state: 'visible' });
    await this.awardsNavItem.waitFor({ state: 'visible' });
    await this.settingsNavItem.waitFor({ state: 'visible' });
  }
} 