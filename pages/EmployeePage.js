import { expect } from '@playwright/test';

export class EmployeePage {
  constructor(page) {
    this.page = page;

    this.url = '/web/index.php/pim/addEmployee';

    // Form fields
    this.firstNameField  = page.locator("[name='firstName']");
    this.middleNameField = page.locator("[name='middleName']");
    this.lastNameField   = page.locator("[name='lastName']");
    this.saveButton      = page.locator("button[type='submit']");
    this.cancelButton    = page.locator("button[type='button']:has-text('Cancel')");
    this.errorMessage    = page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message');
    this.errorInput      = page.locator('.oxd-input.oxd-input--error');

    // Login details toggle (dynamic fields)
    this.createLoginToggle  = page.locator('.oxd-switch-input');
    this.loginUsernameField = page.locator("input[autocomplete='off']").first();
    this.loginPasswordField = page.locator("input[type='password']").first();

    // Toast notifications
    this.successToast   = page.locator('.oxd-toast.oxd-toast--success');
    this.errorToast     = page.locator('.oxd-toast.oxd-toast--error');
    this.toastContainer = page.locator('.oxd-toast-container.oxd-toast-container--bottom');
    this.toastTitle     = page.locator('.oxd-text--toast-title.oxd-toast-content-text');
    this.toastMessage   = page.locator('.oxd-text--toast-message.oxd-toast-content-text');
    this.toastCloseBtn  = page.locator('.oxd-toast-close');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
    await this.firstNameField.waitFor({ state: 'visible', timeout: 60000 });
  }

  async fillForm({ firstName = '', middleName = '', lastName = '' } = {}) {
    await this.firstNameField.fill(firstName);
    if (middleName) await this.middleNameField.fill(middleName);
    await this.lastNameField.fill(lastName);
  }

  async submit() {
    await this.saveButton.click();
  }

  async fillAndSubmit(employee) {
    await this.fillForm(employee);
    await this.submit();
  }

  async triggerSuccessToast({ firstName, lastName } = {}) {
    await this.goto();
    await this.firstNameField.fill(firstName ?? 'Test');
    await this.lastNameField.fill(lastName ?? 'User');
    await this.submit();
    await expect(this.successToast).toBeVisible({ timeout: 8000 });
  }

  async triggerErrorNotification() {
    await this.goto();
    await this.submit();
    await expect(this.errorMessage.first()).toBeVisible();
  }

  async toggleLoginDetails(enable = true) {
    const isChecked = await this.createLoginToggle.isChecked();
    if (enable && !isChecked) await this.createLoginToggle.click();
    if (!enable && isChecked) await this.createLoginToggle.click();
  }
}
