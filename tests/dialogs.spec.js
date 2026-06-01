import { test, expect } from '../test-fixtures/index.js';

test.describe('Dialogs — Page Load', () => {
  test.beforeEach(async ({ jobTitlesPage }) => {
    await jobTitlesPage.goto();
  });

  test('TC01 - job titles page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp('viewJobTitleList'));
  });

  test('TC02 - table has at least one row', async ({ jobTitlesPage }) => {
    await expect(jobTitlesPage.tableRows.first()).toBeVisible();
  });

  test('TC03 - Add button is visible on job titles page', async ({ jobTitlesPage }) => {
    await expect(jobTitlesPage.addButton).toBeVisible();
  });

  test('TC04 - delete icon is visible on each table row', async ({ jobTitlesPage }) => {
    await expect(jobTitlesPage.deleteButton.first()).toBeVisible();
  });
});

test.describe('Dialogs — Confirm Dialog', () => {
  test.beforeEach(async ({ jobTitlesPage }) => {
    await jobTitlesPage.goto();
  });

  test('TC05-TC07 - confirm dialog has all required buttons with correct labels', async ({ jobTitlesPage }) => {
    await jobTitlesPage.openDeleteConfirm();
    await expect.soft(jobTitlesPage.confirmYesBtn).toBeVisible();
    await expect.soft(jobTitlesPage.confirmNoBtn).toBeVisible();
    await expect.soft(jobTitlesPage.confirmYesBtn).toContainText('Delete');
    expect(test.info().errors).toHaveLength(0);
  });

  test('TC08 - clicking No closes the dialog without deleting', async ({ jobTitlesPage }) => {
    const { rowsBefore, rowsAfter } = await jobTitlesPage.cancelDelete();
    expect(rowsAfter).toEqual(rowsBefore);
  });

  test('TC09 - after clicking No the table row count is unchanged', async ({ jobTitlesPage }) => {
    const before = await jobTitlesPage.getRowCount();
    await jobTitlesPage.openDeleteConfirm();
    await jobTitlesPage.confirmNoBtn.click();
    const after = await jobTitlesPage.getRowCount();
    expect(after).toEqual(before);
  });

  test('TC10 - confirm dialog disappears after clicking No', async ({ jobTitlesPage }) => {
    await jobTitlesPage.openDeleteConfirm();
    await jobTitlesPage.confirmNoBtn.click();
    await expect(jobTitlesPage.confirmYesBtn).not.toBeVisible();
  });
});

test.describe('Dialogs — Add Job Title Page', () => {
  test.beforeEach(async ({ jobTitlesPage }) => {
    await jobTitlesPage.goto();
  });

  test('TC11 - clicking Add button navigates to Add Job Title page', async ({ page, jobTitlesPage }) => {
    await jobTitlesPage.openAddPage();
    await expect(page).toHaveURL(new RegExp('saveJobTitle'));
  });

  test('TC12 - Add Job Title page has a heading', async ({ jobTitlesPage }) => {
    await jobTitlesPage.openAddPage();
    await expect(jobTitlesPage.addJobTitleHeading).toBeVisible();
  });

  test('TC13 - heading text is Add Job Title', async ({ jobTitlesPage }) => {
    await jobTitlesPage.openAddPage();
    const title = await jobTitlesPage.getAddPageTitle();
    expect(title?.trim()).toBe('Add Job Title');
  });

  test('TC14 - Add Job Title page has a Save button', async ({ jobTitlesPage }) => {
    await jobTitlesPage.openAddPage();
    await expect(jobTitlesPage.saveButton).toBeVisible();
  });

  test('TC15 - Add Job Title page has a Cancel button', async ({ jobTitlesPage }) => {
    await jobTitlesPage.openAddPage();
    await expect(jobTitlesPage.cancelButton).toBeVisible();
  });

  test('TC16 - clicking Cancel navigates back to job titles list', async ({ page, jobTitlesPage }) => {
    await jobTitlesPage.openAddPage();
    await jobTitlesPage.cancelButton.click();
    await expect(page).toHaveURL(new RegExp('viewJobTitleList'));
  });

  test('TC17 - submitting empty form shows required validation error', async ({ jobTitlesPage }) => {
    await jobTitlesPage.openAddPage();
    await jobTitlesPage.saveButton.click();
    await expect(jobTitlesPage.validationError).toBeVisible();
  });

  test('TC18 - add job title form has all required elements present', async ({ page, jobTitlesPage }) => {
    await jobTitlesPage.openAddPage();
    await expect.soft(jobTitlesPage.addJobTitleHeading).toHaveText('Add Job Title');
    await expect.soft(jobTitlesPage.saveButton).toBeEnabled();
    await expect.soft(page).toHaveURL(new RegExp('saveJobTitle'));
    expect(test.info().errors).toHaveLength(0);
  });
});
