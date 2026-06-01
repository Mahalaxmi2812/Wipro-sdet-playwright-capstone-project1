import { expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES  = path.resolve(__dirname, '../fixtures');

export class EmployeeProfilePage {
  constructor(page) {
    this.page = page;

    this.url = '/web/index.php/pim/viewPersonalDetails/empNumber/7';

    this.addAttachmentBtn = page.getByRole('button', { name: ' Add' });
    this.browseArea       = page.getByText('Browse');
    this.fileInput        = page.getByRole('button', { name: 'Choose File' });
    this.saveButton       = page.getByRole('button', { name: 'Save' }).nth(2);
    this.tableRows        = page.locator('.oxd-table-row.oxd-table-row--with-border');
    this.errorMessage     = page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message');
    this.successToast     = page.locator('.oxd-toast.oxd-toast--success');
    this.cancelButton     = page.getByRole('button', { name: 'Cancel' }).last();
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
    await this.addAttachmentBtn.waitFor({ state: 'visible', timeout: 60000 });
  }

  async openAttachmentDialog() {
    await this.addAttachmentBtn.click();
    await this.browseArea.waitFor({ state: 'visible', timeout: 10000 });
  }

  async uploadFile(fileName) {
    await this.openAttachmentDialog();
    await this.fileInput.setInputFiles(path.join(FIXTURES, fileName));
    await this.saveButton.click();
  }

  async getUploadedFileName() {
    await this.tableRows.last().waitFor({ state: 'visible', timeout: 8000 });
    return this.tableRows.last().textContent();
  }

  async downloadReport() {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
    await this.page.waitForLoadState('load');
    const exportBtn = this.page.locator('button').filter({ hasText: /export|download/i }).first();
    if (await exportBtn.isVisible()) await exportBtn.click();
    try {
      return await Promise.race([
        downloadPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('no download')), 5000)),
      ]);
    } catch {
      return null;
    }
  }
}
