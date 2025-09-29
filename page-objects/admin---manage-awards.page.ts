import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Represents the Admin - Manage Awards page.
 * Provides methods to interact with elements on the Admin - Manage Awards page.
 */
export class AdminManageAwardsPage extends BasePage {
  // Page Title and Header
  readonly pageTitle: Locator;
  readonly awardsListContainer: Locator;

  // Search and Filter
  readonly searchInput: Locator;
  readonly filterDropdown: Locator;
  readonly clearFiltersButton: Locator;

  // Awards List
  readonly awardsList: Locator;
  readonly awardItems: Locator;
  readonly awardName: Locator;
  readonly awardDescription: Locator;
  readonly awardCriteria: Locator;
  readonly awardStatus: Locator;

  // Actions
  readonly addAwardButton: Locator;
  readonly editAwardButton: Locator;
  readonly deleteAwardButton: Locator;
  readonly viewAwardButton: Locator;

  // Award Form
  readonly awardForm: Locator;
  readonly awardNameInput: Locator;
  readonly awardDescriptionInput: Locator;
  readonly awardCriteriaInput: Locator;
  readonly awardVisibilityToggle: Locator;
  readonly saveAwardButton: Locator;
  readonly cancelAwardButton: Locator;

  // Award Details
  readonly awardDetailView: Locator;
  readonly awardDetailName: Locator;
  readonly awardDetailDescription: Locator;
  readonly awardDetailCriteria: Locator;
  readonly awardDetailStatistics: Locator;

  // Confirmation Dialogs
  readonly deleteConfirmationDialog: Locator;
  readonly confirmDeleteButton: Locator;
  readonly cancelDeleteButton: Locator;

  // Analytics and Reports
  readonly analyticsSection: Locator;
  readonly awardStatistics: Locator;
  readonly userEngagementMetrics: Locator;

  // Settings and Permissions
  readonly settingsSection: Locator;
  readonly visibilitySettings: Locator;
  readonly permissionSettings: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page Title and Header
    this.pageTitle = page.getByRole('heading', { name: /Manage Awards/i });
    this.awardsListContainer = page.locator('[data-testid="awards-list-container"]');

    // Search and Filter
    this.searchInput = page.getByPlaceholder('Search awards...');
    this.filterDropdown = page.getByRole('combobox', { name: /Filter awards/i });
    this.clearFiltersButton = page.getByRole('button', { name: /Clear filters/i });

    // Awards List
    this.awardsList = page.locator('[data-testid="awards-list"]');
    this.awardItems = page.locator('[data-testid="award-item"]');
    this.awardName = page.locator('[data-testid="award-name"]');
    this.awardDescription = page.locator('[data-testid="award-description"]');
    this.awardCriteria = page.locator('[data-testid="award-criteria"]');
    this.awardStatus = page.locator('[data-testid="award-status"]');

    // Actions
    this.addAwardButton = page.getByRole('button', { name: /Add Award/i });
    this.editAwardButton = page.getByRole('button', { name: /Edit/i });
    this.deleteAwardButton = page.getByRole('button', { name: /Delete/i });
    this.viewAwardButton = page.getByRole('button', { name: /View/i });

    // Award Form
    this.awardForm = page.locator('[data-testid="award-form"]');
    this.awardNameInput = page.getByLabel('Award Name');
    this.awardDescriptionInput = page.getByLabel('Description');
    this.awardCriteriaInput = page.getByLabel('Criteria');
    this.awardVisibilityToggle = page.getByRole('checkbox', { name: /Visible to users/i });
    this.saveAwardButton = page.getByRole('button', { name: /Save Award/i });
    this.cancelAwardButton = page.getByRole('button', { name: /Cancel/i });

    // Award Details
    this.awardDetailView = page.locator('[data-testid="award-detail-view"]');
    this.awardDetailName = page.locator('[data-testid="award-detail-name"]');
    this.awardDetailDescription = page.locator('[data-testid="award-detail-description"]');
    this.awardDetailCriteria = page.locator('[data-testid="award-detail-criteria"]');
    this.awardDetailStatistics = page.locator('[data-testid="award-detail-statistics"]');

    // Confirmation Dialogs
    this.deleteConfirmationDialog = page.locator('[data-testid="delete-confirmation-dialog"]');
    this.confirmDeleteButton = page.getByRole('button', { name: /Confirm Delete/i });
    this.cancelDeleteButton = page.getByRole('button', { name: /Cancel/i });

    // Analytics and Reports
    this.analyticsSection = page.locator('[data-testid="awards-analytics"]');
    this.awardStatistics = page.locator('[data-testid="award-statistics"]');
    this.userEngagementMetrics = page.locator('[data-testid="user-engagement-metrics"]');

    // Settings and Permissions
    this.settingsSection = page.locator('[data-testid="awards-settings"]');
    this.visibilitySettings = page.locator('[data-testid="visibility-settings"]');
    this.permissionSettings = page.locator('[data-testid="permission-settings"]');
  }

  /**
   * Wait for the Awards Management page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.awardsListContainer.waitFor({ state: 'visible' });
  }

  /**
   * Search for awards by name or description
   */
  async searchAwards(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Clear the search input
   */
  async clearSearch(): Promise<void> {
    await this.searchInput.clear();
  }

  /**
   * Filter awards by status
   */
  async filterAwardsByStatus(status: string): Promise<void> {
    await this.filterDropdown.click();
    await this.page.getByRole('option', { name: status }).click();
  }

  /**
   * Clear all applied filters
   */
  async clearFilters(): Promise<void> {
    await this.clearFiltersButton.click();
  }

  /**
   * Get all award items from the list
   */
  async getAwardItems(): Promise<Locator[]> {
    return await this.awardItems.all();
  }

  /**
   * Get award by name
   */
  async getAwardByName(awardName: string): Promise<Locator> {
    return this.awardItems.filter({ hasText: awardName }).first();
  }

  /**
   * Click on an award to view details
   */
  async clickAward(awardName: string): Promise<void> {
    const award = await this.getAwardByName(awardName);
    await award.click();
  }

  /**
   * Open the Add Award form
   */
  async openAddAwardForm(): Promise<void> {
    await this.addAwardButton.click();
    await this.awardForm.waitFor({ state: 'visible' });
  }

  /**
   * Fill in the award form
   */
  async fillAwardForm(awardData: {
    name: string;
    description: string;
    criteria: string;
    visible?: boolean;
  }): Promise<void> {
    await this.awardNameInput.fill(awardData.name);
    await this.awardDescriptionInput.fill(awardData.description);
    await this.awardCriteriaInput.fill(awardData.criteria);
    
    if (awardData.visible !== undefined) {
      const isChecked = await this.awardVisibilityToggle.isChecked();
      if (isChecked !== awardData.visible) {
        await this.awardVisibilityToggle.click();
      }
    }
  }

  /**
   * Save the award form
   */
  async saveAward(): Promise<void> {
    await this.saveAwardButton.click();
    await this.awardForm.waitFor({ state: 'hidden' });
  }

  /**
   * Cancel the award form
   */
  async cancelAwardForm(): Promise<void> {
    await this.cancelAwardButton.click();
  }

  /**
   * Edit an existing award
   */
  async editAward(awardName: string): Promise<void> {
    const award = await this.getAwardByName(awardName);
    await award.hover();
    await this.editAwardButton.click();
    await this.awardForm.waitFor({ state: 'visible' });
  }

  /**
   * Delete an award
   */
  async deleteAward(awardName: string): Promise<void> {
    const award = await this.getAwardByName(awardName);
    await award.hover();
    await this.deleteAwardButton.click();
    await this.deleteConfirmationDialog.waitFor({ state: 'visible' });
    await this.confirmDeleteButton.click();
  }

  /**
   * View award details
   */
  async viewAwardDetails(awardName: string): Promise<void> {
    await this.clickAward(awardName);
    await this.awardDetailView.waitFor({ state: 'visible' });
  }

  /**
   * Get award details from the detail view
   */
  async getAwardDetails(): Promise<{
    name: string;
    description: string;
    criteria: string;
    statistics: string;
  }> {
    const name = await this.awardDetailName.textContent();
    const description = await this.awardDetailDescription.textContent();
    const criteria = await this.awardDetailCriteria.textContent();
    const statistics = await this.awardDetailStatistics.textContent();

    return {
      name: name || '',
      description: description || '',
      criteria: criteria || '',
      statistics: statistics || '',
    };
  }

  /**
   * Open analytics section
   */
  async openAnalytics(): Promise<void> {
    await this.analyticsSection.click();
    await this.awardStatistics.waitFor({ state: 'visible' });
  }

  /**
   * Get award statistics
   */
  async getAwardStatistics(): Promise<string> {
    return await this.awardStatistics.textContent() || '';
  }

  /**
   * Get user engagement metrics
   */
  async getUserEngagementMetrics(): Promise<string> {
    return await this.userEngagementMetrics.textContent() || '';
  }

  /**
   * Open settings section
   */
  async openSettings(): Promise<void> {
    await this.settingsSection.click();
    await this.visibilitySettings.waitFor({ state: 'visible' });
  }

  /**
   * Configure award visibility settings
   */
  async configureVisibilitySettings(settings: {
    visibleToAllUsers: boolean;
    requireApproval: boolean;
  }): Promise<void> {
    // Implementation for visibility settings
    await this.visibilitySettings.click();
    // Add specific implementation based on actual UI
  }

  /**
   * Configure permission settings
   */
  async configurePermissionSettings(settings: {
    allowUserSubmission: boolean;
    requireAdminApproval: boolean;
  }): Promise<void> {
    // Implementation for permission settings
    await this.permissionSettings.click();
    // Add specific implementation based on actual UI
  }

  /**
   * Verify award exists in the list
   */
  async verifyAwardExists(awardName: string): Promise<boolean> {
    const award = await this.getAwardByName(awardName);
    return await award.isVisible();
  }

  /**
   * Verify award does not exist in the list
   */
  async verifyAwardDoesNotExist(awardName: string): Promise<boolean> {
    const award = await this.getAwardByName(awardName);
    return !(await award.isVisible());
  }

  /**
   * Get the total number of awards
   */
  async getAwardsCount(): Promise<number> {
    const items = await this.awardItems.all();
    return items.length;
  }

  /**
   * Wait for awards list to load
   */
  async waitForAwardsList(): Promise<void> {
    await this.awardsList.waitFor({ state: 'visible' });
  }
} 