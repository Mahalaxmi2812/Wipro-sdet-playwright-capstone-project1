import { expect } from '@playwright/test';

export class JobTitlesPage {
  constructor(page) {
    this.page = page;

    this.url           = '/web/index.php/admin/viewJobTitleList';
    this.addJobTitleUrl = '/web/index.php/admin/saveJobTitle';

    // Job titles list page
    this.addButton    = page.locator(".oxd-button.oxd-button--secondary:has-text('Add')");
    this.deleteButton = page.locator('.oxd-icon.bi-trash');
    this.tableRows    = page.locator('.oxd-table-row.oxd-table-row--with-border');

    // Confirm delete dialog
    this.confirmYesBtn = page.getByRole('button', { name: ' Yes, Delete' });
    this.confirmNoBtn  = page.getByRole('button', { name: 'No, Cancel' });

    // Add Job Title page
    this.addJobTitleHeading = page.getByRole('heading', { name: 'Add Job Title' });
    this.saveButton         = page.getByRole('button', { name: 'Save' });
    this.cancelButton       = page.getByRole('button', { name: 'Cancel' });
    this.validationError    = page.getByText('Required', { exact: true });
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
    await this.tableRows.first().waitFor({ state: 'visible', timeout: 60000 });
  }

  async openDeleteConfirm() {
    await this.deleteButton.first().click();
    await expect(this.confirmYesBtn).toBeVisible({ timeout: 5000 });
  }

  async cancelDelete() {
    const rowsBefore = await this.tableRows.count();
    await this.openDeleteConfirm();
    await this.confirmNoBtn.click();
    const rowsAfter = await this.tableRows.count();
    return { rowsBefore, rowsAfter };
  }

  async openAddPage() {
    await this.addButton.click();
    await this.page.waitForURL('**/admin/saveJobTitle');
    await this.page.waitForLoadState('load');
    await this.addJobTitleHeading.waitFor({ state: 'visible', timeout: 60000 });
  }

  async getAddPageTitle() {
    return this.addJobTitleHeading.textContent();
  }

  async getRowCount() {
    return this.tableRows.count();
  }
}
