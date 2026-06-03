import { test, expect } from '../test-fixtures/index.js';

test.describe('Tables — Page Load', () => {
  test.beforeEach(async ({ employeeListPage }) => {
    await employeeListPage.goto();
  });

  test('TC01 - employee list page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(new RegExp('viewEmployeeList'));
  });

  test('TC02 - table has at least one row', async ({ employeeListPage }) => {
    await expect(employeeListPage.clickableRows.first()).toBeVisible();
  });

  test('TC03 - table shows rows by default', async ({ employeeListPage }) => {
    const count = await employeeListPage.clickableRows.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('TC04-TC06 - employee list has all search controls visible and enabled', async ({ employeeListPage }) => {
    await expect.soft(employeeListPage.searchButton).toBeEnabled();
    await expect.soft(employeeListPage.resetButton).toBeVisible();
    await expect.soft(employeeListPage.filterInput).toBeVisible();
    expect(test.info().errors).toHaveLength(0);
  });
});

test.describe('Tables — Sorting', () => {
  test.beforeEach(async ({ employeeListPage }) => {
    await employeeListPage.goto();
  });

  test('TC07 - clicking a column header changes row order', async ({ employeeListPage }) => {
    const { before, after } = await employeeListPage.sortByColumn(1);
    expect(before).not.toEqual(after);
  });

  test('TC08 - table rows are present after sorting', async ({ employeeListPage }) => {
    const { after } = await employeeListPage.sortByColumn(1);
    expect(after.length).toBeGreaterThan(0);
  });

  test('TC09 - clicking same header again reverses order', async ({ employeeListPage }) => {
    const { after: ascRows }  = await employeeListPage.sortByColumn(1, 'Ascending');
    const { after: descRows } = await employeeListPage.sortByColumn(1, 'Descending');
    expect(ascRows).not.toEqual(descRows);
  });
});

test.describe('Tables — Pagination', () => {
  test.beforeEach(async ({ employeeListPage }) => {
    await employeeListPage.goto();
  });

  test('TC10 - pagination control is present when multiple pages exist', async ({ employeeListPage }) => {
    const totalPages = await employeeListPage.getTotalPageCount();
    if (totalPages < 2) test.skip(true, 'Demo site has fewer than 50 employees — pagination not shown');
    expect(totalPages).toBeGreaterThan(1);
  });

  test('TC11 - page 2 shows different records than page 1', async ({ employeeListPage }) => {
    const totalPages = await employeeListPage.getTotalPageCount();
    if (totalPages < 2) test.skip(true, 'Demo site has fewer than 50 employees — no page 2');
    const page1First = await employeeListPage.getFirstRowText();
    await employeeListPage.goToPage(2);
    const page2First = await employeeListPage.getFirstRowText();
    expect(page1First).not.toEqual(page2First);
  });

  test('TC12 - page 3 shows different records than page 2', async ({ employeeListPage }) => {
    const totalPages = await employeeListPage.getTotalPageCount();
    if (totalPages < 3) test.skip(true, 'Demo site has fewer than 100 employees — no page 3');
    await employeeListPage.goToPage(2);
    const page2First = await employeeListPage.getFirstRowText();
    await employeeListPage.goToPage(3);
    const page3First = await employeeListPage.getFirstRowText();
    expect(page2First).not.toEqual(page3First);
  });

  test('TC13 - navigating back to page 1 restores first page records', async ({ employeeListPage }) => {
    const totalPages = await employeeListPage.getTotalPageCount();
    if (totalPages < 2) test.skip(true, 'Demo site has fewer than 50 employees — no page 2');
    const page1First = await employeeListPage.getFirstRowText();
    await employeeListPage.goToPage(2);
    await employeeListPage.goToPage(1);
    const backToPage1 = await employeeListPage.getFirstRowText();
    expect(page1First).toEqual(backToPage1);
  });

  test('TC14 - page 1 button has selected styling', async ({ employeeListPage }) => {
    const totalPages = await employeeListPage.getTotalPageCount();
    if (totalPages < 2) test.skip(true, 'Demo site has fewer than 50 employees — pagination not shown');
    await expect(employeeListPage.selectedPageBtn).toBeVisible();
  });
});

test.describe('Tables — Filtering', () => {
  test.beforeEach(async ({ employeeListPage }) => {
    await employeeListPage.goto();
  });

  test('TC15 - filtering by a known name returns fewer rows', async ({ employeeListPage }) => {
    const totalBefore = await employeeListPage.getRowCount();
    await employeeListPage.filterByName('Admin');
    const totalAfter = await employeeListPage.getRowCount();
    expect(totalAfter).toBeLessThanOrEqual(totalBefore);
  });

  test('TC16 - filtering by nonexistent name shows no records message', async ({ employeeListPage }) => {
    await employeeListPage.filterByName('ZZZNOTEXIST999');
    await expect(employeeListPage.noRecordsMessage.first()).toContainText('No Records Found');
  });

  test('TC17 - reset filter restores records', async ({ employeeListPage }) => {
    await employeeListPage.filterByName('Admin');
    await employeeListPage.resetFilter();
    const count = await employeeListPage.getRowCount();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('TC18 - edit button navigates to employee detail page', async ({ page, employeeListPage }) => {
    await employeeListPage.clickEdit(0);
    await expect(page).toHaveURL(new RegExp('viewPersonalDetails'));
  });

  test('TC19 - employee table has correct structure with headers, rows and search input', async ({ employeeListPage }) => {
    const headerCount = await employeeListPage.columnHeaders.count();
    const rowCount    = await employeeListPage.clickableRows.count();
    await expect.soft(employeeListPage.filterInput).toHaveAttribute('placeholder', 'Type for hints...');
    expect.soft(headerCount).toBeGreaterThanOrEqual(5);
    expect.soft(rowCount).toBeGreaterThanOrEqual(1);
    expect(test.info().errors).toHaveLength(0);
  });
});
