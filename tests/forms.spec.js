import { test, expect } from '../test-fixtures/index.js';
import { testData } from '../utils/fakerHelper.js';

test.describe('Forms — Page Load', () => {
  test.beforeEach(async ({ employeePage }) => {
    await employeePage.goto();
  });

  test('TC01 - add employee page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp('addEmployee'));
  });

  test('TC02 - first name field is visible', async ({ employeePage }) => {
    await expect(employeePage.firstNameField).toBeVisible();
  });

  test('TC03 - last name field is visible', async ({ employeePage }) => {
    await expect(employeePage.lastNameField).toBeVisible();
  });

  test('TC04 - middle name field is visible', async ({ employeePage }) => {
    await expect(employeePage.middleNameField).toBeVisible();
  });

  test('TC05 - save button is visible', async ({ employeePage }) => {
    await expect(employeePage.saveButton).toBeVisible();
  });

  test('TC06 - cancel button is visible', async ({ employeePage }) => {
    await expect(employeePage.cancelButton).toBeVisible();
  });
});

test.describe('Forms — Single Field Input', () => {
  test.beforeEach(async ({ employeePage }) => {
    await employeePage.goto();
  });

  test('TC07 - first name field accepts and retains text input', async ({ employeePage }) => {
    await employeePage.firstNameField.fill('John');
    await expect(employeePage.firstNameField).toHaveValue('John');
  });

  test('TC08 - last name field accepts and retains text input', async ({ employeePage }) => {
    await employeePage.lastNameField.fill('Doe');
    await expect(employeePage.lastNameField).toHaveValue('Doe');
  });

  test('TC09 - middle name field accepts and retains text input', async ({ employeePage }) => {
    await employeePage.middleNameField.fill('Michael');
    await expect(employeePage.middleNameField).toHaveValue('Michael');
  });

  test('TC10 - first name field can be cleared and refilled', async ({ employeePage }) => {
    await employeePage.firstNameField.fill('OldName');
    await employeePage.firstNameField.fill('NewName');
    await expect(employeePage.firstNameField).toHaveValue('NewName');
  });

  test('TC11 - save with valid first and last name shows success toast', async ({ employeePage }) => {
    const emp = testData.employee();
    await employeePage.fillAndSubmit(emp);
    await expect(employeePage.successToast).toBeVisible({ timeout: 8000 });
  });

  test('TC12 - cancel button navigates back to employee list', async ({ page, employeePage }) => {
    await employeePage.cancelButton.click();
    await expect(page).toHaveURL(new RegExp('viewEmployeeList'));
  });
});

test.describe('Forms — Validation Errors', () => {
  test.beforeEach(async ({ employeePage }) => {
    await employeePage.goto();
  });

  test('TC13 - submitting empty form shows required error on first name', async ({ employeePage }) => {
    await employeePage.fillForm({ firstName: '', lastName: '' });
    await employeePage.submit();
    await expect(employeePage.errorMessage.first()).toBeVisible();
  });

  test('TC14 - validation error text says Required', async ({ employeePage }) => {
    await employeePage.fillForm({ firstName: '', lastName: '' });
    await employeePage.submit();
    await expect(employeePage.errorMessage.first()).toContainText('Required');
  });

  test('TC15 - submitting only first name shows error on last name', async ({ employeePage }) => {
    await employeePage.firstNameField.fill('John');
    await employeePage.submit();
    await expect(employeePage.errorMessage.first()).toBeVisible();
  });

  test('TC16 - both empty fields produce at least two validation errors', async ({ employeePage }) => {
    await employeePage.fillForm({ firstName: '', lastName: '' });
    await employeePage.submit();
    await expect(employeePage.errorMessage.first()).toBeVisible();
    const count = await employeePage.errorMessage.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('TC17 - error input field has error styling class', async ({ employeePage }) => {
    await employeePage.fillForm({ firstName: '', lastName: '' });
    await employeePage.submit();
    await expect(employeePage.errorInput.first()).toBeVisible();
  });

  test('TC18 - fixing required fields and resubmitting shows success', async ({ employeePage }) => {
    await employeePage.fillForm({ firstName: '', lastName: '' });
    await employeePage.submit();
    const emp = testData.employee();
    await employeePage.fillForm(emp);
    await employeePage.submit();
    await expect(employeePage.successToast).toBeVisible({ timeout: 8000 });
  });
});

test.describe('Forms — Dynamic Fields', () => {
  test.beforeEach(async ({ employeePage }) => {
    await employeePage.goto();
  });

  test('TC19 - create login details toggle is present on add employee page', async ({ employeePage }) => {
    await expect(employeePage.createLoginToggle).toBeVisible();
  });

  test('TC20 - login detail fields are hidden by default', async ({ employeePage }) => {
    await expect(employeePage.loginUsernameField).not.toBeVisible();
  });

  test('TC21 - enabling the toggle reveals the username field', async ({ employeePage }) => {
    await employeePage.toggleLoginDetails(true);
    await expect(employeePage.loginUsernameField).toBeVisible();
  });

  test('TC22 - enabling the toggle reveals the password field', async ({ employeePage }) => {
    await employeePage.toggleLoginDetails(true);
    await expect(employeePage.loginPasswordField).toBeVisible();
  });

  test('TC23 - disabling the toggle hides the login fields again', async ({ employeePage }) => {
    await employeePage.toggleLoginDetails(true);
    await expect(employeePage.loginUsernameField).toBeVisible();
    await employeePage.createLoginToggle.click();
    await expect(employeePage.loginUsernameField).not.toBeVisible();
  });
});
