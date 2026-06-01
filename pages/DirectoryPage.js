import { expect } from '@playwright/test';

export class DirectoryPage {
  constructor(page) {
    this.page = page;

    this.url = '/web/index.php/directory/viewDirectory';

    this.nameInput      = page.locator("input[placeholder='Type for hints...']").first();
    this.searchButton   = page.locator("button[type='submit']");
    this.resetButton    = page.locator("button[type='reset']");
    this.resultCards    = page.locator('.orangehrm-directory-card');
    this.invalidMessage = page.getByText('Invalid');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
    await this.resultCards.first().waitFor({ state: 'visible', timeout: 60000 });
  }

  async search(name) {
    await this.nameInput.fill(name);
    await this.searchButton.click();
    await this.page.waitForLoadState('load');
  }

  async reset() {
    await this.resetButton.click();
    await this.page.waitForLoadState('load');
    await this.resultCards.first().waitFor({ state: 'visible', timeout: 60000 });
  }

  async getResultCardCount() {
    await this.page.waitForLoadState('load');
    return this.resultCards.count();
  }
}
