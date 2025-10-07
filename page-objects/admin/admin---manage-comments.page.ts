import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

/**
 * Represents the Admin - Manage Comments page.
 * Provides methods to interact with elements on the Admin - Manage Comments page.
 */
export class AdminManageCommentsPage extends BasePage {
  // Page Title and Header
  readonly pageTitle: Locator;
  readonly commentsListContainer: Locator;

  // Data Source Selection
  readonly commentsDSDropdown: Locator;
  readonly selectedCommentsDS: Locator;

  // Search and Filter
  readonly searchInput: Locator;
  readonly filterDropdown: Locator;
  readonly clearFiltersButton: Locator;

  // Comments List
  readonly commentsList: Locator;
  readonly commentItems: Locator;
  readonly commentAuthor: Locator;
  readonly commentContent: Locator;
  readonly commentDate: Locator;
  readonly commentStatus: Locator;

  // Actions
  readonly deleteCommentButton: Locator;
  readonly approveCommentButton: Locator;
  readonly rejectCommentButton: Locator;
  readonly flagCommentButton: Locator;
  readonly editCommentButton: Locator;

  // Comment Details
  readonly commentDetailView: Locator;
  readonly commentDetailAuthor: Locator;
  readonly commentDetailContent: Locator;
  readonly commentDetailDate: Locator;
  readonly commentDetailContext: Locator;

  // Confirmation Dialogs
  readonly deleteConfirmationDialog: Locator;
  readonly confirmDeleteButton: Locator;
  readonly cancelDeleteButton: Locator;

  // Moderation Tools
  readonly moderationPanel: Locator;
  readonly approveAllButton: Locator;
  readonly rejectAllButton: Locator;
  readonly bulkActionsDropdown: Locator;

  // Analytics and Reports
  readonly analyticsSection: Locator;
  readonly commentStatistics: Locator;
  readonly moderationMetrics: Locator;

  // Settings and Permissions
  readonly settingsSection: Locator;
  readonly moderationSettings: Locator;
  readonly permissionSettings: Locator;

  // Categories and Tags
  readonly categoriesSection: Locator;
  readonly addCategoryButton: Locator;
  readonly categoryInput: Locator;
  readonly tagInput: Locator;

  constructor(page: Page) {
    super(page);
    
    // Page Title and Header
    this.pageTitle = page.getByRole('heading', { name: /Manage Comments/i });
    this.commentsListContainer = page.locator('[data-testid="comments-list-container"]');

    // Data Source Selection
    this.commentsDSDropdown = page.getByRole('combobox', { name: /Select Comments DS/i });
    this.selectedCommentsDS = page.locator('[data-testid="selected-comments-ds"]');

    // Search and Filter
    this.searchInput = page.getByPlaceholder('Search comments...');
    this.filterDropdown = page.getByRole('combobox', { name: /Filter comments/i });
    this.clearFiltersButton = page.getByRole('button', { name: /Clear filters/i });

    // Comments List
    this.commentsList = page.locator('[data-testid="comments-list"]');
    this.commentItems = page.locator('[data-testid="comment-item"]');
    this.commentAuthor = page.locator('[data-testid="comment-author"]');
    this.commentContent = page.locator('[data-testid="comment-content"]');
    this.commentDate = page.locator('[data-testid="comment-date"]');
    this.commentStatus = page.locator('[data-testid="comment-status"]');

    // Actions
    this.deleteCommentButton = page.getByRole('button', { name: /Delete/i });
    this.approveCommentButton = page.getByRole('button', { name: /Approve/i });
    this.rejectCommentButton = page.getByRole('button', { name: /Reject/i });
    this.flagCommentButton = page.getByRole('button', { name: /Flag/i });
    this.editCommentButton = page.getByRole('button', { name: /Edit/i });

    // Comment Details
    this.commentDetailView = page.locator('[data-testid="comment-detail-view"]');
    this.commentDetailAuthor = page.locator('[data-testid="comment-detail-author"]');
    this.commentDetailContent = page.locator('[data-testid="comment-detail-content"]');
    this.commentDetailDate = page.locator('[data-testid="comment-detail-date"]');
    this.commentDetailContext = page.locator('[data-testid="comment-detail-context"]');

    // Confirmation Dialogs
    this.deleteConfirmationDialog = page.locator('[data-testid="delete-confirmation-dialog"]');
    this.confirmDeleteButton = page.getByRole('button', { name: /Confirm Delete/i });
    this.cancelDeleteButton = page.getByRole('button', { name: /Cancel/i });

    // Moderation Tools
    this.moderationPanel = page.locator('[data-testid="moderation-panel"]');
    this.approveAllButton = page.getByRole('button', { name: /Approve All/i });
    this.rejectAllButton = page.getByRole('button', { name: /Reject All/i });
    this.bulkActionsDropdown = page.getByRole('combobox', { name: /Bulk Actions/i });

    // Analytics and Reports
    this.analyticsSection = page.locator('[data-testid="comments-analytics"]');
    this.commentStatistics = page.locator('[data-testid="comment-statistics"]');
    this.moderationMetrics = page.locator('[data-testid="moderation-metrics"]');

    // Settings and Permissions
    this.settingsSection = page.locator('[data-testid="comments-settings"]');
    this.moderationSettings = page.locator('[data-testid="moderation-settings"]');
    this.permissionSettings = page.locator('[data-testid="permission-settings"]');

    // Categories and Tags
    this.categoriesSection = page.locator('[data-testid="categories-section"]');
    this.addCategoryButton = page.getByRole('button', { name: /Add Category/i });
    this.categoryInput = page.getByLabel('Category Name');
    this.tagInput = page.getByLabel('Tag Name');
  }

  /**
   * Wait for the Comments Management page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.pageTitle.waitFor({ state: 'visible' });
    await this.commentsListContainer.waitFor({ state: 'visible' });
  }

  /**
   * Select Comments Data Source
   */
  async selectCommentsDS(dsName: string): Promise<void> {
    await this.commentsDSDropdown.click();
    await this.page.getByRole('option', { name: dsName }).click();
    await this.selectedCommentsDS.waitFor({ state: 'visible' });
  }

  /**
   * Get selected Comments DS name
   */
  async getSelectedCommentsDS(): Promise<string> {
    return await this.selectedCommentsDS.textContent() || '';
  }

  /**
   * Search for comments by content or author
   */
  async searchComments(searchTerm: string): Promise<void> {
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
   * Filter comments by status
   */
  async filterCommentsByStatus(status: string): Promise<void> {
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
   * Get all comment items from the list
   */
  async getCommentItems(): Promise<Locator[]> {
    return await this.commentItems.all();
  }

  /**
   * Get comment by content or author
   */
  async getCommentByContent(content: string): Promise<Locator> {
    return this.commentItems.filter({ hasText: content }).first();
  }

  /**
   * Click on a comment to view details
   */
  async clickComment(content: string): Promise<void> {
    const comment = await this.getCommentByContent(content);
    await comment.click();
  }

  /**
   * View comment details
   */
  async viewCommentDetails(content: string): Promise<void> {
    await this.clickComment(content);
    await this.commentDetailView.waitFor({ state: 'visible' });
  }

  /**
   * Get comment details from the detail view
   */
  async getCommentDetails(): Promise<{
    author: string;
    content: string;
    date: string;
    context: string;
  }> {
    const author = await this.commentDetailAuthor.textContent();
    const content = await this.commentDetailContent.textContent();
    const date = await this.commentDetailDate.textContent();
    const context = await this.commentDetailContext.textContent();

    return {
      author: author || '',
      content: content || '',
      date: date || '',
      context: context || '',
    };
  }

  /**
   * Delete a comment
   */
  async deleteComment(content: string): Promise<void> {
    const comment = await this.getCommentByContent(content);
    await comment.hover();
    await this.deleteCommentButton.click();
    await this.deleteConfirmationDialog.waitFor({ state: 'visible' });
    await this.confirmDeleteButton.click();
  }

  /**
   * Approve a comment
   */
  async approveComment(content: string): Promise<void> {
    const comment = await this.getCommentByContent(content);
    await comment.hover();
    await this.approveCommentButton.click();
  }

  /**
   * Reject a comment
   */
  async rejectComment(content: string): Promise<void> {
    const comment = await this.getCommentByContent(content);
    await comment.hover();
    await this.rejectCommentButton.click();
  }

  /**
   * Flag a comment as inappropriate
   */
  async flagComment(content: string): Promise<void> {
    const comment = await this.getCommentByContent(content);
    await comment.hover();
    await this.flagCommentButton.click();
  }

  /**
   * Edit a comment
   */
  async editComment(content: string, newContent: string): Promise<void> {
    const comment = await this.getCommentByContent(content);
    await comment.hover();
    await this.editCommentButton.click();
    
    // Find and fill the edit input
    const editInput = this.page.getByRole('textbox', { name: /Edit comment/i });
    await editInput.fill(newContent);
    await this.page.getByRole('button', { name: /Save/i }).click();
  }

  /**
   * Open moderation panel
   */
  async openModerationPanel(): Promise<void> {
    await this.moderationPanel.click();
  }

  /**
   * Approve all pending comments
   */
  async approveAllComments(): Promise<void> {
    await this.approveAllButton.click();
  }

  /**
   * Reject all pending comments
   */
  async rejectAllComments(): Promise<void> {
    await this.rejectAllButton.click();
  }

  /**
   * Perform bulk actions on selected comments
   */
  async performBulkAction(action: string): Promise<void> {
    await this.bulkActionsDropdown.click();
    await this.page.getByRole('option', { name: action }).click();
  }

  /**
   * Open analytics section
   */
  async openAnalytics(): Promise<void> {
    await this.analyticsSection.click();
    await this.commentStatistics.waitFor({ state: 'visible' });
  }

  /**
   * Get comment statistics
   */
  async getCommentStatistics(): Promise<string> {
    return await this.commentStatistics.textContent() || '';
  }

  /**
   * Get moderation metrics
   */
  async getModerationMetrics(): Promise<string> {
    return await this.moderationMetrics.textContent() || '';
  }

  /**
   * Open settings section
   */
  async openSettings(): Promise<void> {
    await this.settingsSection.click();
    await this.moderationSettings.waitFor({ state: 'visible' });
  }

  /**
   * Configure moderation settings
   */
  async configureModerationSettings(settings: {
    autoApprove: boolean;
    requireApproval: boolean;
    flagInappropriate: boolean;
  }): Promise<void> {
    // Implementation for moderation settings
    await this.moderationSettings.click();
    // Add specific implementation based on actual UI
  }

  /**
   * Configure permission settings
   */
  async configurePermissionSettings(settings: {
    allowUserComments: boolean;
    requireModeration: boolean;
    allowEditing: boolean;
  }): Promise<void> {
    // Implementation for permission settings
    await this.permissionSettings.click();
    // Add specific implementation based on actual UI
  }

  /**
   * Open categories section
   */
  async openCategories(): Promise<void> {
    await this.categoriesSection.click();
  }

  /**
   * Add a new category
   */
  async addCategory(categoryName: string): Promise<void> {
    await this.addCategoryButton.click();
    await this.categoryInput.fill(categoryName);
    await this.page.getByRole('button', { name: /Save Category/i }).click();
  }

  /**
   * Add a tag to a comment
   */
  async addTagToComment(content: string, tagName: string): Promise<void> {
    const comment = await this.getCommentByContent(content);
    await comment.hover();
    await this.tagInput.fill(tagName);
    await this.page.getByRole('button', { name: /Add Tag/i }).click();
  }

  /**
   * Verify comment exists in the list
   */
  async verifyCommentExists(content: string): Promise<boolean> {
    const comment = await this.getCommentByContent(content);
    return await comment.isVisible();
  }

  /**
   * Verify comment does not exist in the list
   */
  async verifyCommentDoesNotExist(content: string): Promise<boolean> {
    const comment = await this.getCommentByContent(content);
    return !(await comment.isVisible());
  }

  /**
   * Get the total number of comments
   */
  async getCommentsCount(): Promise<number> {
    const items = await this.commentItems.all();
    return items.length;
  }

  /**
   * Wait for comments list to load
   */
  async waitForCommentsList(): Promise<void> {
    await this.commentsList.waitFor({ state: 'visible' });
  }

  /**
   * Get comment status
   */
  async getCommentStatus(content: string): Promise<string> {
    const comment = await this.getCommentByContent(content);
    const statusElement = comment.locator('[data-testid="comment-status"]');
    return await statusElement.textContent() || '';
  }

  /**
   * Filter comments by category
   */
  async filterCommentsByCategory(category: string): Promise<void> {
    await this.filterDropdown.click();
    await this.page.getByRole('option', { name: category }).click();
  }

  /**
   * Export comments data
   */
  async exportComments(): Promise<void> {
    await this.page.getByRole('button', { name: /Export/i }).click();
  }
} 