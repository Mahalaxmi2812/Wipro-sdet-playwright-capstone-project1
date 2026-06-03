import { expect } from '@playwright/test';

export class EmployeeListPage {
  constructor(page) {
    this.page = page;

    this.url = '/web/index.php/pim/viewEmployeeList';

    this.clickableRows   = page.locator('.oxd-table-row.oxd-table-row--with-border.oxd-table-row--clickable');
    this.paginationList  = page.locator('.oxd-pagination__ul');
    this.pageButtons     = page.locator('.oxd-pagination-page-item.oxd-pagination-page-item--page');
    this.selectedPageBtn = page.locator('.oxd-pagination-page-item--page-selected');
    this.filterInput     = page.locator("input[placeholder='Type for hints...']").first();
    this.searchButton    = page.locator("button[type='submit']");
    this.resetButton     = page.locator("button[type='reset']");
    this.columnHeaders      = page.locator('.oxd-table-header-cell');
    this.noRecordsMessage   = page.getByText('No Records Found');
    this.autocompleteOption = page.locator('.oxd-autocomplete-option');
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState('load');
    await this.clickableRows.first().waitFor({ state: 'visible', timeout: 60000 });
  }

  async sortByColumn(columnIndex = 1, direction = 'Ascending') {
    await this.clickableRows.first().waitFor({ state: 'visible' });
    const before = await this.clickableRows.allTextContents();

    // Step 1: click the column header to reveal the sort icon
    await this.columnHeaders.nth(columnIndex).click();

    // Step 2: click the sort icon (handles all states: unsorted, asc, desc)
    await this.page.locator(
      '.oxd-icon.bi-arrow-down-up, .oxd-icon.bi-sort-alpha-up, .oxd-icon.bi-sort-alpha-down'
    ).first().click();

    // Step 3: pick Ascending or Descending from the dropdown
    await this.page.getByRole('listitem').filter({ hasText: direction }).click();

    await this.page.waitForLoadState('load');
    await this.clickableRows.first().waitFor({ state: 'visible' });
    const after = await this.clickableRows.allTextContents();
    return { before, after };
  }

  async goToPage(pageNumber) {
    const btn = this.pageButtons.filter({ hasText: String(pageNumber) });
    await expect(btn).toBeVisible();
    await btn.click();
    await this.page.waitForLoadState('load');
    await this.clickableRows.first().waitFor({ state: 'visible' });
  }

  async getFirstRowText() {
    await this.clickableRows.first().waitFor({ state: 'visible' });
    return this.clickableRows.first().textContent();
  }

  async getTotalPageCount() {
    return this.pageButtons.count();
  }

  async filterByName(name) {
    await this.filterInput.fill(name);
    await this.searchButton.click();
    await this.page.waitForLoadState('load');
    await Promise.race([
      this.clickableRows.first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
      this.noRecordsMessage.first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
    ]);
  }

  async resetFilter() {
    await this.resetButton.click();
    await this.page.waitForLoadState('load');
    await this.clickableRows.first().waitFor({ state: 'visible' });
  }

  async getRowCount() {
    await this.page.waitForLoadState('load');
    return this.clickableRows.count();
  }

  async clickEdit(rowIndex = 0) {
    await this.clickableRows.first().waitFor({ state: 'visible' });
    await this.clickableRows.nth(rowIndex).getByRole('button').filter({ hasText: /^$/ }).first().click();
    await this.page.waitForURL('**/pim/viewPersonalDetails/**');
  }
}
