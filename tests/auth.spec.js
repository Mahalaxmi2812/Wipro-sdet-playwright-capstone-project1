import { test, expect } from '../test-fixtures/index.js';

// Auth tests must start logged OUT — override the global storageState
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Auth — Login Page Elements', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC01 - login page loads and URL contains auth/login', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp('auth/login'));
  });

  test('TC02-TC04 - login form fields and button are present and interactive', async ({ loginPage }) => {
    await expect.soft(loginPage.usernameField).toBeVisible();
    await expect.soft(loginPage.passwordField).toBeEnabled();
    await expect.soft(loginPage.submitButton).toContainText('Login');
    await expect.soft(loginPage.submitButton).toBeEnabled();
    expect(test.info().errors).toHaveLength(0);
  });

  test('TC05 - forgot password link is visible', async ({ loginPage }) => {
    await expect(loginPage.forgotPasswordLink).toBeVisible();
  });

  test('TC06 - forgot password link contains text Forgot', async ({ loginPage }) => {
    await expect(loginPage.forgotPasswordLink).toContainText('Forgot');
  });
});

test.describe('Auth — Valid Login', () => {
  test('TC07 - valid credentials redirect to dashboard', async ({ page, loginPage }) => {
    await loginPage.loginExpectSuccess();
    await expect(page).toHaveURL(new RegExp('dashboard'));
  });

  test('TC08 - dashboard shows main navigation menu after login', async ({ loginPage }) => {
    await loginPage.loginExpectSuccess();
    await expect(loginPage.mainMenuItem.first()).toBeVisible();
  });

  test('TC09 - admin role sees Admin menu item on dashboard', async ({ loginPage }) => {
    await loginPage.loginExpectSuccess();
    await expect(loginPage.mainMenuItem.filter({ hasText: 'Admin' })).toBeVisible();
  });

  test('TC10 - API bypass login reaches dashboard without UI form interaction', async ({ page, loginPage }) => {
    await loginPage.apiBypass();
    await expect(page).toHaveURL(new RegExp('dashboard'));
  });
});

test.describe('Auth — Invalid Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC11 - wrong password shows error alert', async ({ loginPage }) => {
    await loginPage.login(process.env.ADMIN_USERNAME, 'wrongpassword');
    await expect(loginPage.errorAlert).toBeVisible();
  });

  test('TC12 - wrong username shows error alert', async ({ loginPage }) => {
    await loginPage.login('wronguser', process.env.ADMIN_PASSWORD);
    await expect(loginPage.errorAlert).toBeVisible();
  });

  test('TC13 - empty username field shows error', async ({ loginPage }) => {
    await loginPage.login('', process.env.ADMIN_PASSWORD);
    await expect(loginPage.clientErrorMessage.first()).toBeVisible();
  });

  test('TC14 - empty password field shows error', async ({ loginPage }) => {
    await loginPage.login(process.env.ADMIN_USERNAME, '');
    await expect(loginPage.clientErrorMessage.first()).toBeVisible();
  });

  test('TC15 - both fields empty shows error', async ({ loginPage }) => {
    await loginPage.login('', '');
    await expect(loginPage.clientErrorMessage.first()).toBeVisible();
  });

  test('TC16 - error message contains Invalid credentials text', async ({ loginPage }) => {
    await loginPage.login(process.env.ADMIN_USERNAME, 'wrong');
    await expect(loginPage.errorAlert).toContainText('Invalid');
  });

  test('TC17 - page stays on login URL after failed login', async ({ page, loginPage }) => {
    await loginPage.login(process.env.ADMIN_USERNAME, 'wrong');
    await expect(page).toHaveURL(new RegExp('auth/login'));
  });

  test('TC23 - invalid login shows error alert with correct message and stays on login page', async ({ page, loginPage }) => {
    await loginPage.login(process.env.ADMIN_USERNAME, 'wrongpassword');
    await expect.soft(loginPage.errorAlert).toBeVisible();
    await expect.soft(loginPage.errorAlert).toContainText('Invalid');
    await expect.soft(page).toHaveURL(new RegExp('auth/login'));
    expect(test.info().errors).toHaveLength(0);
  });
});

test.describe('Auth — Logout', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.loginExpectSuccess();
  });

  test('TC18 - logout redirects to login page', async ({ page, loginPage }) => {
    await loginPage.logout();
    await expect(page).toHaveURL(new RegExp('auth/login'));
  });

  test('TC19 - login form is visible after logout', async ({ loginPage }) => {
    await loginPage.logout();
    await expect(loginPage.usernameField).toBeVisible();
  });
});

test.describe('Auth — Forgot Password', () => {
  test('TC20 - forgot password link navigates to reset page', async ({ page, loginPage }) => {
    await loginPage.goToForgotPassword();
    await expect(page).toHaveURL(new RegExp('requestPasswordResetCode'));
  });

  test('TC21 - reset page has a username input field', async ({ loginPage }) => {
    await loginPage.goToForgotPassword();
    await expect(loginPage.usernameField).toBeVisible();
  });

  test('TC22 - clicking cancel on reset page navigates back to login', async ({ page, loginPage }) => {
    await loginPage.goToForgotPassword();
    await loginPage.cancelButton.click();
    await expect(page).toHaveURL(new RegExp('auth/login'));
  });
});
