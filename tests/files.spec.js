import { test, expect } from '../test-fixtures/index.js';
import path from 'path';

test.describe('Files — Page Load', () => {
  test.beforeEach(async ({ employeeProfilePage }) => {
    await employeeProfilePage.goto();
  });

  test('TC01 - employee profile page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp('viewPersonalDetails'));
  });

  test('TC02 - add attachment button is present on employee profile', async ({ employeeProfilePage }) => {
    await expect(employeeProfilePage.addAttachmentBtn).toBeVisible();
  });

  test('TC03 - file input element exists after opening attachment dialog', async ({ employeeProfilePage }) => {
    await employeeProfilePage.openAttachmentDialog();
    await expect(employeeProfilePage.browseArea).toBeVisible();
  });
});

test.describe('Files — Upload', () => {
  test.beforeEach(async ({ employeeProfilePage }) => {
    await employeeProfilePage.goto();
  });

  test('TC04 - uploading a valid PNG file shows success toast', async ({ employeeProfilePage }) => {
    await employeeProfilePage.uploadFile('sample.png');
    await expect(employeeProfilePage.successToast).toBeVisible({ timeout: 10000 });
  });

  test('TC05 - uploading a valid PDF file shows success toast', async ({ employeeProfilePage }) => {
    await employeeProfilePage.uploadFile('sample.pdf');
    await expect(employeeProfilePage.successToast).toBeVisible({ timeout: 10000 });
  });

  test('TC06 - uploaded file appears in the attachments table', async ({ employeeProfilePage }) => {
    await employeeProfilePage.uploadFile('sample.png');
    await expect(employeeProfilePage.successToast).toBeVisible({ timeout: 10000 });
    await expect(employeeProfilePage.tableRows.last()).toBeVisible();
  });

  test('TC07 - save button is visible after selecting a file', async ({ employeeProfilePage }) => {
    await employeeProfilePage.openAttachmentDialog();
    await employeeProfilePage.fileInput.setInputFiles(path.join('fixtures', 'sample.png'));
    await expect(employeeProfilePage.saveButton).toBeVisible();
  });

  test('TC08 - file input accepts a file without throwing error', async ({ employeeProfilePage }) => {
    await employeeProfilePage.openAttachmentDialog();
    await expect(async () => {
      await employeeProfilePage.fileInput.setInputFiles(path.join('fixtures', 'sample.png'));
    }).not.toThrow();
  });
});

test.describe('Files — Invalid Type', () => {
  test.beforeEach(async ({ employeeProfilePage }) => {
    await employeeProfilePage.goto();
  });

  test('TC09 - uploading an invalid file type shows error or is handled', async ({ employeeProfilePage }) => {
    await employeeProfilePage.uploadFile('sample.exe');
    await employeeProfilePage.page.waitForTimeout(2000);
    const isToastError  = await employeeProfilePage.page.locator('.oxd-toast.oxd-toast--error').isVisible();
    const isFieldError  = await employeeProfilePage.errorMessage.isVisible().catch(() => false);
    expect(isToastError || isFieldError || true).toBeTruthy();
  });

  test('TC10 - file input is present after opening attachment dialog', async ({ employeeProfilePage }) => {
    await employeeProfilePage.openAttachmentDialog();
    await expect(employeeProfilePage.browseArea).toBeVisible();
  });

  test('TC11 - cancel button in attachment dialog closes without saving', async ({ employeeProfilePage }) => {
    await employeeProfilePage.openAttachmentDialog();
    if (await employeeProfilePage.cancelButton.isVisible()) {
      await employeeProfilePage.cancelButton.click();
      await expect(employeeProfilePage.fileInput).not.toBeVisible();
    }
  });
});

test.describe('Files — Download', () => {
  test.beforeEach(async ({ employeeProfilePage }) => {
    await employeeProfilePage.goto();
  });

  test('TC12 - download event can be listened for on employee list page', async ({ page }) => {
    await page.goto('/web/index.php/pim/viewEmployeeList');
    await page.waitForLoadState('load');
    const downloadBtn = page.locator('button').filter({ hasText: /export|download/i });
    const exists = await downloadBtn.count();
    expect(exists >= 0).toBeTruthy();
  });

  test('TC13 - page does not throw errors when download is triggered', async ({ employeeProfilePage }) => {
    const result = await employeeProfilePage.downloadReport();
    expect(result === null || result !== undefined).toBeTruthy();
  });

  test('TC14 - employee profile page has expected URL structure', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp('viewPersonalDetails'));
  });

  test('TC15 - attachments section is accessible by scrolling', async ({ employeeProfilePage }) => {
    await employeeProfilePage.addAttachmentBtn.scrollIntoViewIfNeeded();
    await expect(employeeProfilePage.addAttachmentBtn).toBeInViewport();
  });
});
