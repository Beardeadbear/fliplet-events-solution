import { Page, Locator } from '@playwright/test';
import { NavigationMenu } from './navigation-menu.page';

export class AgendaPage {
  readonly page: Page;
  readonly navigationMenu: NavigationMenu;

  // Main container
  readonly agendaContainer: Locator;
  
  // Date navigation
  readonly dateNavigation: Locator;
  readonly dateItems: Locator;
  readonly activeDateItem: Locator;
  
  // Session list
  readonly sessionList: Locator;
  readonly sessionItems: Locator;
  
  // Session details
  readonly sessionTitles: Locator;
  readonly sessionTimes: Locator;
  readonly sessionLocations: Locator;
  readonly sessionDateText: Locator;
  
  // Filters
  readonly filterContainer: Locator;
  readonly filterButtons: Locator;
  readonly applyFilterButton: Locator;
  readonly clearFilterButton: Locator;
  
  // Search
  readonly searchInput: Locator;
  readonly searchResults: Locator;
  
  // Session detail overlay
  readonly sessionDetailOverlay: Locator;
  readonly sessionDetailContent: Locator;
  readonly sessionDetailCloseButton: Locator;
  
  // Back button
  readonly backButton: Locator;
  
  // RSVP and Capacity
  readonly rsvpButton: Locator;
  readonly capacityText: Locator;
  
  // Loading and empty states
  readonly loadingHolder: Locator;
  readonly noResultsHolder: Locator;
  readonly emptyStateMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationMenu = new NavigationMenu(page);

    // Main container
    this.agendaContainer = page.locator('.new-agenda-list-container');
    
    // Date navigation
    this.dateNavigation = page.locator('.agenda-date-selector');
    this.dateItems = page.locator('.agenda-date-selector li');
    this.activeDateItem = page.locator('.agenda-date-selector li.active');
    
    // Session list
    this.sessionList = page.locator('.agenda-list-holder');
    this.sessionItems = page.locator('.agenda-list-item');
    
    // Session details
    this.sessionTitles = page.locator('.agenda-item-title');
    this.sessionTimes = page.locator('.agenda-item-time');
    this.sessionLocations = page.locator('.agenda-item-location');
    this.sessionDateText = page.locator('.session-date-text p');
    
    // Filters
    this.filterContainer = page.locator('.active-filters');
    this.filterButtons = page.locator('.hidden-filter-controls-filter-container button');
    this.applyFilterButton = page.getByRole('button', { name: 'Apply' });
    this.clearFilterButton = page.getByRole('button', { name: 'Clear' });
    
    // Search
    this.searchInput = page.locator('input[type="search"], .search-input');
    this.searchResults = page.locator('.search-results-holder');
    
    // Session detail overlay
    this.sessionDetailOverlay = page.locator('.agenda-detail-overlay');
    this.sessionDetailContent = page.locator('.agenda-detail-overlay-content');
    this.sessionDetailCloseButton = page.locator('.agenda-detail-overlay-close');
    
    // Back button
    this.backButton = page.getByRole('button', { name: 'Go back' });
    
    // RSVP and Capacity
    this.rsvpButton = page.getByRole('button', { name: 'RSVP' });
    this.capacityText = page.locator('.agenda-item-bookmark');
    
    // Loading and empty states
    this.loadingHolder = page.locator('.loading-holder');
    this.noResultsHolder = page.locator('.no-results-holder');
    this.emptyStateMessage = page.locator('.agenda-item-empty-state');
  }

  /**
   * Navigate to the Agenda page using NavigationMenu
   */
  async navigateTo() {
    await this.navigationMenu.navigateTo('agenda');
  }

  /**
   * Click on a specific date in the date navigation
   */
  async selectDate(dateIndex: number) {
    await this.dateItems.nth(dateIndex).click();
  }

  /**
   * Get the currently active date
   */
  async getActiveDate() {
    return await this.activeDateItem.textContent();
  }

  /**
   * Click on a session item to open its detail view
   */
  async clickSessionItem(index: number = 0) {
    await this.sessionItems.nth(index).click();
  }

  /**
   * Get session title by index
   */
  async getSessionTitle(index: number = 0) {
    return await this.sessionTitles.nth(index).textContent();
  }

  /**
   * Get session time by index
   */
  async getSessionTime(index: number = 0) {
    return await this.sessionTimes.nth(index).textContent();
  }

  /**
   * Get session location by index
   */
  async getSessionLocation(index: number = 0) {
    return await this.sessionLocations.nth(index).textContent();
  }

  /**
   * Click RSVP button for a session
   */
  async clickRSVP(index: number = 0) {
    await this.rsvpButton.nth(index).click();
  }

  /**
   * Search for sessions
   */
  async searchSessions(searchTerm: string) {
    await this.searchInput.fill(searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Apply filters
   */
  async applyFilters() {
    await this.applyFilterButton.click();
  }

  /**
   * Clear all filters
   */
  async clearFilters() {
    await this.clearFilterButton.click();
  }

  /**
   * Close session detail overlay
   */
  async closeSessionDetail() {
    await this.sessionDetailCloseButton.click();
  }

  /**
   * Wait for agenda to load
   */
  async waitForAgendaLoad() {
    await this.agendaContainer.waitFor({ state: 'visible' });
    await this.loadingHolder.waitFor({ state: 'hidden' });
  }

  /**
   * Check if session detail overlay is visible
   */
  async isSessionDetailVisible() {
    return await this.sessionDetailOverlay.isVisible();
  }

  /**
   * Get the number of visible sessions
   */
  async getSessionCount() {
    return await this.sessionItems.count();
  }

  /**
   * Check if RSVP button is available for a session
   */
  async isRSVPAvailable(index: number = 0) {
    return await this.rsvpButton.nth(index).isVisible();
  }

  /**
   * Get capacity information for a session
   */
  async getCapacityInfo(index: number = 0) {
    return await this.capacityText.nth(index).textContent();
  }
} 