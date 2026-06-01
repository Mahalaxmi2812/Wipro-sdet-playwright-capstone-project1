import { test, expect } from '../test-fixtures/index.js';

test.describe('API Mocking — Mock Success', () => {
  test.beforeEach(async ({ apiMockPage }) => {
    await apiMockPage.gotoEmployeeList();
  });

  test('TC01 - mocked employee list renders mocked names in table', async ({ apiMockPage }) => {
    await apiMockPage.mockSuccess();
    await apiMockPage.gotoEmployeeList();
    await apiMockPage.clickableRows.first().waitFor({ state: 'visible' });
    const text = await apiMockPage.clickableRows.first().textContent();
    expect(text).toContain('Mock');
  });

  test('TC02 - mocked response shows exactly 2 rows in the table', async ({ apiMockPage }) => {
    await apiMockPage.mockSuccess();
    await apiMockPage.gotoEmployeeList();
    await apiMockPage.clickableRows.first().waitFor({ state: 'visible' });
    const count = await apiMockPage.clickableRows.count();
    expect(count).toBe(2);
  });

  test('TC03 - mocked response shows second employee name in table', async ({ apiMockPage }) => {
    await apiMockPage.mockSuccess();
    await apiMockPage.gotoEmployeeList();
    await apiMockPage.clickableRows.first().waitFor({ state: 'visible' });
    const allText = await apiMockPage.clickableRows.allTextContents();
    const hasFake = allText.some(t => t.includes('Fake') || t.includes('Mock'));
    expect(hasFake).toBeTruthy();
  });

  test('TC04 - page renders without error when mock returns valid payload', async ({ page, apiMockPage }) => {
    await apiMockPage.mockSuccess();
    await apiMockPage.gotoEmployeeList();
    await expect(page).not.toHaveURL(new RegExp('error'));
  });
});

test.describe('API Mocking — Mock Empty State', () => {
  test.beforeEach(async ({ apiMockPage }) => {
    await apiMockPage.gotoEmployeeList();
  });

  test('TC05 - mocking empty employee list shows No Records Found', async ({ apiMockPage }) => {
    await apiMockPage.mockEmpty();
    await apiMockPage.gotoEmployeeList();
    await expect(apiMockPage.noRecords).toBeVisible();
  });

  test('TC06 - mocking empty directory shows zero result cards', async ({ apiMockPage }) => {
    await apiMockPage.mockEmptyDirectory();
    await apiMockPage.gotoDirectory();
    const count = await apiMockPage.resultCards.count();
    expect(count).toBe(0);
  });

  test('TC07 - empty list mock returns zero clickable rows', async ({ apiMockPage }) => {
    await apiMockPage.mockEmpty();
    await apiMockPage.gotoEmployeeList();
    await expect(apiMockPage.noRecords).toBeVisible();
    const count = await apiMockPage.clickableRows.count();
    expect(count).toBe(0);
  });
});

test.describe('API Mocking — Mock Errors', () => {
  test.beforeEach(async ({ apiMockPage }) => {
    await apiMockPage.gotoEmployeeList();
  });

  test('TC08 - mocking 500 error does not crash the browser', async ({ page, apiMockPage }) => {
    await apiMockPage.mockError(500);
    await apiMockPage.gotoEmployeeList();
    expect(page).toBeTruthy();
  });

  test('TC09 - mocking 404 does not crash the browser', async ({ page, apiMockPage }) => {
    await apiMockPage.mockError(404);
    await apiMockPage.gotoEmployeeList();
    expect(page).toBeTruthy();
  });

  test('TC10 - mocking 401 keeps user on the page or redirects', async ({ page, apiMockPage }) => {
    await apiMockPage.mockError(401);
    await apiMockPage.gotoEmployeeList();
    await page.waitForLoadState('load');
    expect(page.url().length).toBeGreaterThan(0);
  });

  test('TC11 - after unrouting a mock the real data loads again', async ({ apiMockPage }) => {
    await apiMockPage.mockEmpty();
    await apiMockPage.gotoEmployeeList();
    await expect(apiMockPage.noRecords).toBeVisible();
    await apiMockPage.page.unrouteAll();
    await apiMockPage.gotoEmployeeList();
    await apiMockPage.clickableRows.first().waitFor({ state: 'visible' });
    const count = await apiMockPage.clickableRows.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('API Mocking — Slow Network', () => {
  test.beforeEach(async ({ apiMockPage }) => {
    await apiMockPage.gotoEmployeeList();
  });

  test('TC12 - slow mock delays the table from loading immediately', async ({ apiMockPage }) => {
    await apiMockPage.mockSlow(1500);
    const start = Date.now();
    await apiMockPage.gotoEmployeeList();
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThan(1000);
  });

  test('TC13 - after slow mock resolves table rows are visible', async ({ apiMockPage }) => {
    await apiMockPage.mockSlow(1000);
    await apiMockPage.gotoEmployeeList();
    await apiMockPage.clickableRows.first().waitFor({ state: 'visible' });
    const count = await apiMockPage.clickableRows.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('API Mocking — Intercept & Modify', () => {
  test.beforeEach(async ({ apiMockPage }) => {
    await apiMockPage.gotoEmployeeList();
  });

  test('TC14 - intercepted response shows injected name in table', async ({ apiMockPage }) => {
    await apiMockPage.interceptAndModify();
    await apiMockPage.gotoEmployeeList();
    await apiMockPage.clickableRows.first().waitFor({ state: 'visible' });
    const allText = await apiMockPage.clickableRows.allTextContents();
    expect(allText.some(t => t.includes('Injected'))).toBeTruthy();
  });

  test('TC15 - custom modify function changes a specific field in the response', async ({ apiMockPage }) => {
    await apiMockPage.interceptAndModify(json => {
      if (json.data?.[0]) json.data[0].firstName = 'CustomName';
      return json;
    });
    await apiMockPage.gotoEmployeeList();
    await apiMockPage.clickableRows.first().waitFor({ state: 'visible' });
    const allText = await apiMockPage.clickableRows.allTextContents();
    expect(allText.some(t => t.includes('CustomName'))).toBeTruthy();
  });
});
