import { test, expect } from '@playwright/test';
import { HomePage } from '../../../page-objects/home.page';
import { NavigationMenu } from '../../../page-objects/general/navigation-menu.page';

test.describe('Event Info Management', () => {
  let homePage: HomePage;
  let navigationMenu: NavigationMenu;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    navigationMenu = new NavigationMenu(page);
    
    // Navigate to home page and wait for load
    await homePage.goto();
    await homePage.waitForPageLoad();
  });

  test('Admin can edit Event Info item', async ({ page }) => {
    // 1. Verify we're on the home page
    await expect(homePage.eventTitle).toBeVisible();
    
    // 2. Check if admin menu is accessible (expand More menu)
    await navigationMenu.expandMoreMenu();
    
    // 3. Verify admin menu button is visible (admin user required)
    await expect(navigationMenu.adminNavItem).toBeVisible();
    
    // 4. Click on admin menu to access admin panel
    await navigationMenu.adminNavItem.click();
    
    // 5. Navigate to event info management section
    // Note: This will need to be updated based on actual admin panel structure
    const eventInfoEditButton = page.getByRole('button', { name: /edit event info|manage event/i });
    await expect(eventInfoEditButton).toBeVisible();
    await eventInfoEditButton.click();
    
    // 6. Verify edit form is displayed
    const editForm = page.locator('.event-info-edit-form, .edit-event-form, [class*="edit-form"]');
    await expect(editForm).toBeVisible();
    
    // 7. Modify event details
    const eventTitleInput = page.getByLabel('Event Title', { exact: false });
    const eventDescriptionInput = page.getByLabel('Event Description', { exact: false });
    
    await expect(eventTitleInput).toBeVisible();
    await expect(eventDescriptionInput).toBeVisible();
    
    // 8. Update event information
    const newTitle = 'Updated AI Summit 2025';
    const newDescription = 'Updated event description for testing purposes';
    
    await eventTitleInput.fill(newTitle);
    await eventDescriptionInput.fill(newDescription);
    
    // 9. Save changes
    const saveButton = page.getByRole('button', { name: /save|update|submit/i });
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    
    // 10. Verify success message
    const successMessage = page.locator('.success-message, .alert-success, [class*="success"]');
    await expect(successMessage).toBeVisible();
    
    // 11. Navigate back to home page to verify changes
    await navigationMenu.goToHome();
    await homePage.waitForPageLoad();
    
    // 12. Verify updated event title is displayed
    const updatedTitle = await homePage.eventTitle.textContent();
    expect(updatedTitle).toContain('Updated AI Summit');
  });

  test('Admin can view current event information', async ({ page }) => {
    // 1. Access admin panel
    await navigationMenu.expandMoreMenu();
    await expect(navigationMenu.adminNavItem).toBeVisible();
    await navigationMenu.adminNavItem.click();
    
    // 2. Navigate to event info management
    const eventInfoButton = page.getByRole('button', { name: /event info|manage event/i });
    await expect(eventInfoButton).toBeVisible();
    await eventInfoButton.click();
    
    // 3. Verify current event information is displayed
    const eventInfoSection = page.locator('.event-info-section, .event-details, [class*="event-info"]');
    await expect(eventInfoSection).toBeVisible();
    
    // 4. Verify event details are present
    const eventTitle = page.locator('.event-title, h1, h2');
    const eventDescription = page.locator('.event-description, .description');
    
    await expect(eventTitle).toBeVisible();
    await expect(eventDescription).toBeVisible();
    
    // 5. Verify edit functionality is available
    const editButton = page.getByRole('button', { name: /edit|modify/i });
    await expect(editButton).toBeVisible();
  });

  test('Admin can cancel event info editing', async ({ page }) => {
    // 1. Access admin panel and event info
    await navigationMenu.expandMoreMenu();
    await navigationMenu.adminNavItem.click();
    
    const eventInfoButton = page.getByRole('button', { name: /event info|manage event/i });
    await eventInfoButton.click();
    
    // 2. Start editing
    const editButton = page.getByRole('button', { name: /edit|modify/i });
    await editButton.click();
    
    // 3. Verify edit form is displayed
    const editForm = page.locator('.event-info-edit-form, .edit-event-form');
    await expect(editForm).toBeVisible();
    
    // 4. Make some changes
    const eventTitleInput = page.getByLabel('Event Title', { exact: false });
    await eventTitleInput.fill('Temporary change for testing');
    
    // 5. Cancel editing
    const cancelButton = page.getByRole('button', { name: /cancel|discard/i });
    await expect(cancelButton).toBeVisible();
    await cancelButton.click();
    
    // 6. Verify form is closed and original data is preserved
    await expect(editForm).not.toBeVisible();
    
    // 7. Verify original event title is still displayed
    await navigationMenu.goToHome();
    await homePage.waitForPageLoad();
    
    const originalTitle = await homePage.eventTitle.textContent();
    expect(originalTitle).not.toContain('Temporary change');
  });
}); 