import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page, baseURL = process.env.BASE_URL) {
    this.page = page;

    this.url               = '/web/index.php/auth/login';
    this.dashboardUrl      = '/web/index.php/dashboard/index';
    this.forgotPasswordUrl = '/web/index.php/auth/requestPasswordResetCode';
    this.validateEndpoint  = baseURL + '/web/index.php/auth/validate';

    this.usernameField      = page.locator("[name='username']");
    this.passwordField      = page.locator("[name='password']");
    this.submitButton       = page.locator("button[type='submit']");
    this.cancelButton       = page.locator("button[type='button']");
    this.errorAlert         = page.locator('.oxd-alert.oxd-alert--error');
    this.clientErrorMessage = page.locator('.oxd-input-field-error-message');
    this.forgotPasswordLink = page.locator('.orangehrm-login-forgot');
    this.userDropdown       = page.locator('.oxd-userdropdown-tab');
    this.logoutLink         = page.locator('.oxd-userdropdown-link:has-text("Logout")');
    this.mainMenuItem       = page.locator('.oxd-main-menu-item');
    this.csrfTokenInput     = page.locator("input[name='_token']");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async login(username = process.env.ADMIN_USERNAME, password = process.env.ADMIN_PASSWORD) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }

  async loginExpectSuccess(username = process.env.ADMIN_USERNAME, password = process.env.ADMIN_PASSWORD) {
    await this.goto();
    await this.login(username, password);
    await this.page.waitForURL('**' + this.dashboardUrl);
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutLink.click();
    await this.page.waitForURL('**' + this.url);
  }

  async goToForgotPassword() {
    await this.goto();
    await expect(this.forgotPasswordLink).toBeVisible();
    await this.forgotPasswordLink.click();
    await this.page.waitForURL('**' + this.forgotPasswordUrl);
  }

  async apiBypass(username = process.env.ADMIN_USERNAME, password = process.env.ADMIN_PASSWORD) {
    await this.goto();
    const token = await this.csrfTokenInput.inputValue();
    await this.page.evaluate(
      async ({ token, username, password, validateEndpoint }) => {
        const form = new FormData();
        form.append('_token', token);
        form.append('username', username);
        form.append('password', password);
        await fetch(validateEndpoint, { method: 'POST', body: form, credentials: 'include' });
      },
      { token, username, password, validateEndpoint: this.validateEndpoint }
    );
    await this.page.goto(this.dashboardUrl);
  }
}
