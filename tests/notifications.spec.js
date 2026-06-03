import { test, expect } from '../test-fixtures/index.js';
import { testData } from '../utils/fakerHelper.js';

test.describe('Notifications — Success Toast', () => {
  test.beforeEach(async ({ employeePage }) => {
    await employeePage.goto();
  });

  test('TC01 - saving a new employee shows success toast', async ({ employeePage }) => {
    const emp = testData.employee();
    await employeePage.triggerSuccessToast(emp);
    await expect(employeePage.successToast).toBeVisible();
  });

  test('TC02 - success toast has oxd-toast--success CSS class', async ({ employeePage }) => {
    const emp = testData.employee();
    await employeePage.triggerSuccessToast(emp);
    await expect(employeePage.successToast).toBeVisible();
  });

  test('TC03-TC05 - success toast has correct title, message and close button', async ({ employeePage }) => {
    const emp = testData.employee();
    await employeePage.triggerSuccessToast(emp);
    await expect.soft(employeePage.toastTitle).toHaveText('Success');
    await expect.soft(employeePage.toastMessage).toContainText('Successfully Saved');
    await expect.soft(employeePage.toastCloseBtn).toBeVisible();
    expect(test.info().errors).toHaveLength(0);
  });

  test('TC06 - success toast appears at bottom of page', async ({ employeePage }) => {
    const emp = testData.employee();
    await employeePage.triggerSuccessToast(emp);
    await expect(employeePage.toastContainer).toBeVisible({ timeout: 5000 });
  });

  test('TC07 - toast disappears automatically after a few seconds', async ({ employeePage }) => {
    const emp = testData.employee();
    await employeePage.triggerSuccessToast(emp);
    await expect(employeePage.successToast).not.toBeVisible({ timeout: 15000 });
  });
});

test.describe('Notifications — Dismiss Toast', () => {
  test.beforeEach(async ({ employeePage }) => {
    await employeePage.goto();
  });

  test('TC08 - clicking close button dismisses the toast', async ({ employeePage }) => {
    const emp = testData.employee();
    await employeePage.triggerSuccessToast(emp);
    await employeePage.toastCloseBtn.click();
    await expect(employeePage.successToast).not.toBeVisible({ timeout: 5000 });
  });

  test('TC09 - toast is not visible after manual dismiss', async ({ employeePage }) => {
    const emp = testData.employee();
    await employeePage.triggerSuccessToast(emp);
    await employeePage.toastCloseBtn.waitFor({ state: 'visible' });
    await employeePage.toastCloseBtn.click();
    await expect(employeePage.successToast).not.toBeVisible({ timeout: 8000 });
  });
});

test.describe('Notifications — Validation Errors', () => {
  test.beforeEach(async ({ employeePage }) => {
    await employeePage.goto();
  });

  test('TC10 - submitting empty add employee form shows field error', async ({ employeePage }) => {
    await employeePage.triggerErrorNotification();
    await expect(employeePage.errorMessage.first()).toBeVisible();
  });

  test('TC11 - first name required error message is visible', async ({ employeePage }) => {
    await employeePage.firstNameField.clear();
    await employeePage.lastNameField.clear();
    await employeePage.submit();
    await expect(employeePage.errorMessage.first()).toContainText('Required');
  });

  test('TC12 - last name required error message is visible', async ({ employeePage }) => {
    await employeePage.firstNameField.fill('Test');
    await employeePage.lastNameField.clear();
    await employeePage.submit();
    await expect(employeePage.errorMessage.first()).toContainText('Required');
  });

  test('TC13 - multiple validation errors appear at same time', async ({ employeePage }) => {
    await employeePage.submit();
    await expect(employeePage.errorMessage.first()).toBeVisible();
    const count = await employeePage.errorMessage.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('TC14 - fixing all errors and saving shows success toast', async ({ employeePage }) => {
    await employeePage.submit();
    await expect(employeePage.errorMessage.first()).toBeVisible();
    const emp = testData.employee();
    await employeePage.fillForm(emp);
    await employeePage.submit();
    await expect(employeePage.successToast).toBeVisible({ timeout: 15000 });
  });

  test('TC15 - two separate saves produce two separate success toasts', async ({ employeePage }) => {
    const emp1 = testData.employee();
    await employeePage.triggerSuccessToast(emp1);
    await expect(employeePage.successToast).not.toBeVisible({ timeout: 10000 });

    const emp2 = testData.employee();
    await employeePage.triggerSuccessToast(emp2);
    await expect(employeePage.successToast).toBeVisible({ timeout: 15000 });
  });

  test('TC16 - validation errors show correct text, styling and count simultaneously', async ({ employeePage }) => {
    await employeePage.submit();
    await expect.soft(employeePage.errorMessage.first()).toContainText('Required');
    await expect.soft(employeePage.errorInput.first()).toHaveClass(/oxd-input--error/);
    const count = await employeePage.errorMessage.count();
    expect.soft(count).toBeGreaterThanOrEqual(2);
    expect(test.info().errors).toHaveLength(0);
  });
});
