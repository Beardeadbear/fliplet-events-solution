 // page-objects/login.page.ts

import { type Page, type Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { HomePage } from './home.page';

/**
 * LoginPage represents the login screen with all its different states.
 * Includes login, password reset, verification, and error handling.
 */
export class LoginPage extends BasePage {
  // ===========================================
  // LOGIN FORM ELEMENTS (Default State)
  // ===========================================
  public readonly emailInput: Locator;
  public readonly passwordInput: Locator;
  public readonly loginButton: Locator;
  public readonly createAccountButton: Locator;
  public readonly forgotPasswordLink: Locator;
  
  // ===========================================
  // PASSWORD RESET FORM ELEMENTS
  // ===========================================
  public readonly resetEmailInput: Locator;
  public readonly verifyEmailButton: Locator;
  public readonly verificationCodeInput: Locator;
  public readonly newPasswordInput: Locator;
  public readonly confirmPasswordInput: Locator;
  
  // ===========================================
  // ERROR MESSAGE LOCATORS (MCP-extracted)
  // ===========================================
  public readonly loginError: Locator;
  public readonly textDangerError: Locator;
  public readonly alertContainer: Locator;
  
  // ===========================================
  // SPECIFIC ERROR MESSAGE LOCATORS (MCP-discovered patterns)
  // ===========================================
  // Login form errors
  public readonly emailNotFoundError: Locator;
  public readonly rateLimitError: Locator;
  public readonly invalidCredentialsError: Locator;
  

  
  // ===========================================
  // PASSWORD VALIDATION CHECKBOXES
  // ===========================================
  public readonly passwordLengthCheck: Locator;
  public readonly passwordUppercaseCheck: Locator;
  public readonly passwordLowercaseCheck: Locator;
  public readonly passwordNumberCheck: Locator;
  public readonly passwordSpecialCheck: Locator;
  public readonly passwordConfirmationCheck: Locator;

  constructor(page: Page) {
    super(page);

    // ===========================================
    // LOGIN FORM ELEMENTS (MCP-extracted)
    // ===========================================
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.locator('input[name="Password"]');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.createAccountButton = page.locator('button.btn-signup').filter({ hasText: 'Create account' });
    this.forgotPasswordLink = page.locator('span.btn-forget-pass').filter({ hasText: 'Forgot your password?' });
    
    // ===========================================
    // PASSWORD RESET FORM ELEMENTS (MCP-extracted)
    // ===========================================
    this.resetEmailInput = page.locator('input.reset-email-field');
    this.verifyEmailButton = page.locator('button.verify-identity').filter({ hasText: 'Verify email' });
    this.verificationCodeInput = page.locator('input.pin-code-field');
    this.newPasswordInput = page.locator('input.new-password');
    this.confirmPasswordInput = page.locator('input.confirm-password');
    
    // ===========================================
    // ERROR MESSAGE LOCATORS (MCP-extracted)
    // ===========================================
    this.loginError = page.locator('.login-error');
    this.textDangerError = page.locator('.text-danger');
    this.alertContainer = page.locator('[role="alert"]');
    
    // ===========================================
    // SPECIFIC ERROR MESSAGE LOCATORS (MCP-discovered patterns)
    // ===========================================
    // Login form errors
    this.emailNotFoundError = page.locator('.login-error:has-text("The email address could not be found")');
    this.rateLimitError = page.locator('.login-error:has-text("You\'ve made too many attempts")');
    this.invalidCredentialsError = page.locator('.login-error:has-text("Your email or password don\'t match")');
    

    
    // ===========================================
    // PASSWORD VALIDATION CHECKBOXES (MCP-extracted)
    // ===========================================
    this.passwordLengthCheck = page.locator('input.password-length');
    this.passwordUppercaseCheck = page.locator('input.password-uppercase');
    this.passwordLowercaseCheck = page.locator('input.password-lowercase');
    this.passwordNumberCheck = page.locator('input.password-number');
    this.passwordSpecialCheck = page.locator('input.password-special');
    this.passwordConfirmationCheck = page.locator('input.password-confirmation-check');
  }

  // ===========================================
  // MAIN LOGIN ACTIONS
  // ===========================================

  /**
   * Performs complete login with username and password
   */
  async login(username: string, password: string): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
    await expect(this.loginButton).toBeEnabled();
    await this.loginButton.click()
    await this.page.waitForLoadState('networkidle');
    const homePage = new HomePage(this.page);
    await homePage.waitForAuthenticatedUI();
  }

  /**
   * Initiates password reset flow
   */
  async resetPassword(email: string): Promise<void> {
    await this.forgotPasswordLink.waitFor({ state: 'visible' });
    await this.forgotPasswordLink.click();
    
    await this.resetEmailInput.waitFor({ state: 'visible' });
    await this.verifyEmailButton.waitFor({ state: 'visible' });
    
    await this.resetEmailInput.fill(email);
    await this.verifyEmailButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ===========================================
  // FORM INTERACTIONS (Only when they add value)
  // ===========================================

  /**
   * Clears both email and password fields
   */
  async clearForm(): Promise<void> {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Submits form without filling any fields
   */
  async submitEmptyForm(): Promise<void> {
    await this.clearForm();
    await this.loginButton.click();
  }

  // ===========================================
  // VALIDATION METHODS (Simplified)
  // ===========================================



  /**
   * Validates email field shows required message
   */
  async validateEmailRequired(): Promise<void> {
    const message = await this.emailInput.evaluate(el => (el as HTMLInputElement).validationMessage);
    expect(message).toBe('Please fill out this field.');
  }

  /**
   * Validates password field shows required message
   */
  async validatePasswordRequired(): Promise<void> {
    const message = await this.passwordInput.evaluate(el => (el as HTMLInputElement).validationMessage);
    expect(message).toBe('Please fill out this field.');
  }

  /**
   * Validates invalid email format shows correct message
   */
  async validateInvalidEmailFormat(): Promise<void> {
    const message = await this.emailInput.evaluate(el => (el as HTMLInputElement).validationMessage);
    expect(message).toContain("Please include an '@' in the email address");
  }



  /**
   * Validates that email not found error is displayed
   */
  async validateEmailNotFoundError(): Promise<void> {
    await expect(this.emailNotFoundError).toBeVisible();
  }

  /**
   * Validates that rate limit error is displayed
   */
  async validateRateLimitError(): Promise<void> {
    await expect(this.rateLimitError).toBeVisible();
  }

  /**
   * Validates that invalid credentials error is displayed
   */
  async validateInvalidCredentialsError(): Promise<void> {
    await expect(this.invalidCredentialsError).toBeVisible();
  }



  // ===========================================
  // ERROR HANDLING METHODS (Simplified)
  // ===========================================







  // ===========================================
  // STATE CHECKING METHODS (Simplified)
  // ===========================================

  /**
   * Checks if currently in login state
   */
  async isInLoginState(): Promise<boolean> {
    return await this.emailInput.isVisible() && await this.passwordInput.isVisible();
  }

  /**
   * Checks if currently in password reset state
   */
  async isInPasswordResetState(): Promise<boolean> {
    return await this.resetEmailInput.isVisible() && await this.verifyEmailButton.isVisible();
  }



  // ===========================================
  // NAVIGATION METHODS
  // ===========================================

  /**
   * Navigates to registration page
   */
  async goToRegistration(): Promise<void> {
    await this.createAccountButton.click();
  }

  // ===========================================
  // UTILITY METHODS (Simplified)
  // ===========================================

  /**
   * Attempts login and validates error appears
   */
  async loginAndValidateError(email: string, password: string, expectedError?: string): Promise<void> {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
    
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    
    await this.page.waitForLoadState('networkidle');
    
    // Wait for error to appear
    await this.page.waitForFunction(
      () => {
        const errorEl = document.querySelector('.login-error');
        return errorEl && !errorEl.classList.contains('hidden') && errorEl.textContent?.trim();
      },
      { timeout: 10000 }
    );
    
    if (expectedError) {
      await expect(this.loginError).toBeVisible();
      const errorText = await this.loginError.textContent();
      expect(errorText).toContain(expectedError);
    } else {
      expect(await this.loginError.isVisible()).toBe(true);
    }
  }

  /**
   * Validates empty form submission behavior
   */
  async validateEmptyFormSubmission(): Promise<void> {
    await this.submitEmptyForm();
    await this.validateEmailRequired();
  }

  /**
   * Tests invalid email format validation
   */
  async testInvalidEmailFormat(invalidEmail: string): Promise<void> {
    await this.emailInput.fill(invalidEmail);
    await this.passwordInput.fill('somepassword');
    await this.loginButton.click();
    await this.validateInvalidEmailFormat();
  }
}
