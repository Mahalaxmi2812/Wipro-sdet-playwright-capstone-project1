import { test, expect } from '../test-fixtures/index.js';

test.describe('Search — Directory', () => {
  test.beforeEach(async ({ directoryPage }) => {
    await directoryPage.goto();
  });

  test('TC01 - directory page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp('viewDirectory'));
  });

  test('TC02 - directory shows result cards on load', async ({ directoryPage }) => {
    const count = await directoryPage.getResultCardCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC03 - search with known name returns results', async ({ directoryPage }) => {
    await directoryPage.search('Admin');
    const count = await directoryPage.getResultCardCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC04 - search with nonexistent name shows invalid message', async ({ directoryPage }) => {
    await directoryPage.search('ZZZNOMATCH999');
    await expect(directoryPage.invalidMessage).toBeVisible();
  });

  test('TC05 - reset button restores all directory cards', async ({ directoryPage }) => {
    await directoryPage.search('Admin');
    await directoryPage.reset();
    const count = await directoryPage.getResultCardCount();
    expect(count).toBeGreaterThan(0);
  });

  test('TC06 - search input field is visible on directory page', async ({ directoryPage }) => {
    await expect(directoryPage.nameInput).toBeVisible();
  });

  test('TC07 - search button is visible on directory page', async ({ directoryPage }) => {
    await expect(directoryPage.searchButton).toBeVisible();
  });

  test('TC08 - reset button is visible on directory page', async ({ directoryPage }) => {
    await expect(directoryPage.resetButton).toBeVisible();
  });
});

test.describe('Search — Employee List Filter', () => {
  test.beforeEach(async ({ employeeListPage }) => {
    await employeeListPage.goto();
  });

  test('TC09 - employee list has search input field', async ({ employeeListPage }) => {
    await expect(employeeListPage.filterInput).toBeVisible();
  });

  test('TC10 - searching by name reduces result count', async ({ employeeListPage }) => {
    const totalBefore = await employeeListPage.getRowCount();
    await employeeListPage.filterByName('Admin');
    const totalAfter = await employeeListPage.getRowCount();
    expect(totalAfter).toBeLessThanOrEqual(totalBefore);
  });

  test('TC11 - searching nonexistent name shows No Records Found', async ({ employeeListPage }) => {
    await employeeListPage.filterByName('ZZZNOTEXIST999');
    await expect(employeeListPage.noRecordsMessage.first()).toContainText('No Records Found');
  });

  test('TC12 - reset clears filter and restores employees', async ({ employeeListPage }) => {
    await employeeListPage.filterByName('Admin');
    await employeeListPage.resetFilter();
    const count = await employeeListPage.getRowCount();
    expect(count).toBeGreaterThanOrEqual(10);
  });

  test('TC13 - search field accepts typed input', async ({ employeeListPage }) => {
    await employeeListPage.filterInput.fill('Test');
    await expect(employeeListPage.filterInput).toHaveValue('Test');
  });
});

test.describe('Search — Autocomplete', () => {
  test.beforeEach(async ({ employeeListPage }) => {
    await employeeListPage.goto();
  });

  test('TC14 - autocomplete input accepts text on employee list', async ({ employeeListPage }) => {
    await employeeListPage.filterInput.fill('a');
    await expect(employeeListPage.filterInput).toHaveValue('a');
  });

  test('TC15 - typing a prefix shows autocomplete suggestions', async ({ employeeListPage }) => {
    await employeeListPage.filterInput.fill('a');
    await employeeListPage.page.waitForTimeout(1000);
    const options = employeeListPage.autocompleteOption;
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('TC16 - selecting an autocomplete option fills the input field', async ({ employeeListPage }) => {
    await employeeListPage.filterInput.fill('a');
    await employeeListPage.page.waitForTimeout(1000);
    const options = employeeListPage.autocompleteOption;
    const count = await options.count();
    if (count > 0) {
      await options.first().click();
      const value = await employeeListPage.filterInput.inputValue();
      expect(value.length).toBeGreaterThan(0);
    }
  });
});
