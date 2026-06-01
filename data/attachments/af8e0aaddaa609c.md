# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tables.spec.js >> Tables — Page Load >> TC04-TC06 - employee list has all search controls visible and enabled
- Location: tests/tables.spec.js:21:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.oxd-pagination__ul')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "soft toBeVisible" with timeout 5000ms
  - waiting for locator('.oxd-pagination__ul')

```

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "PIM" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: Richardkiki Johnsontae
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem: Configuration 
      - listitem:
        - link "Employee List":
          - /url: "#"
      - listitem:
        - link "Add Employee":
          - /url: "#"
      - listitem:
        - link "Reports":
          - /url: "#"
      - button ""
- heading "Employee Information" [level=5]
- button ""
- separator
- text: Employee Name
- textbox "Type for hints..."
- text: Employee Id
- textbox
- text: Employment Status -- Select --  Include Current Employees Only  Supervisor Name
- textbox "Type for hints..."
- text: Job Title -- Select --  Sub Unit -- Select -- 
- separator
- button "Reset"
- button "Search"
- button " Add"
- separator
- text: (30) Records Found
- table:
  - rowgroup:
    - row " Id  First (& Middle) Name  Last Name  Job Title  Employment Status  Sub Unit  Supervisor  Actions":
      - columnheader "":
        - checkbox ""
        - text: 
      - columnheader "Id "
      - columnheader "First (& Middle) Name "
      - columnheader "Last Name "
      - columnheader "Job Title "
      - columnheader "Employment Status "
      - columnheader "Sub Unit "
      - columnheader "Supervisor "
      - columnheader "Actions"
  - rowgroup:
    - row " 04377 Admin 1  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "04377"
      - cell "Admin"
      - cell "1"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 3835 Alice Smith  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "3835"
      - cell "Alice"
      - cell "Smith"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0425 Arka Roy  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0425"
      - cell "Arka"
      - cell "Roy"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 9610410 Auto PIM User  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "9610410"
      - cell "Auto PIM"
      - cell "User"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 9886726 Auto PIM User  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "9886726"
      - cell "Auto PIM"
      - cell "User"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 9579300 Auto PIM User  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "9579300"
      - cell "Auto PIM"
      - cell "User"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 9649404 Auto PIM User  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "9649404"
      - cell "Auto PIM"
      - cell "User"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 9700607 Auto PIM User  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "9700607"
      - cell "Auto PIM"
      - cell "User"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 9936724 Auto PIM User  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "9936724"
      - cell "Auto PIM"
      - cell "User"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 9760815 Auto PIM User  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "9760815"
      - cell "Auto PIM"
      - cell "User"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 9837612 Auto PIM User  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "9837612"
      - cell "Auto PIM"
      - cell "User"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0451 Emily Wyman  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0451"
      - cell "Emily"
      - cell "Wyman"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0430 Employee 1  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0430"
      - cell "Employee"
      - cell "1"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 04333 Employee 2  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "04333"
      - cell "Employee"
      - cell "2"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 9944474 John Michael Doe  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "9944474"
      - cell "John Michael"
      - cell "Doe"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " kerollos Raafat  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell
      - cell "kerollos"
      - cell "Raafat"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0448 KunDan1780309912034 K Raj  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0448"
      - cell "KunDan1780309912034 K"
      - cell "Raj"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0434 Manasa Manjunath Naik  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0434"
      - cell "Manasa Manjunath"
      - cell "Naik"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0445 maron bon mon  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0445"
      - cell "maron bon"
      - cell "mon"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0433 Mrinal Rai  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0433"
      - cell "Mrinal"
      - cell "Rai"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 1234563 nnb ggg bbbb  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "1234563"
      - cell "nnb ggg"
      - cell "bbbb"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 1234568 nnb ggg bbbb  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "1234568"
      - cell "nnb ggg"
      - cell "bbbb"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0444 Pavan Kalyan  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0444"
      - cell "Pavan"
      - cell "Kalyan"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0440 Pavan Kalyan  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0440"
      - cell "Pavan"
      - cell "Kalyan"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0447 Playwright Agent  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0447"
      - cell "Playwright"
      - cell "Agent"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 0427 Playwright Agent  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0427"
      - cell "Playwright"
      - cell "Agent"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 04370326 Ram Sen  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "04370326"
      - cell "Ram"
      - cell "Sen"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " 04250326 Ram Sen  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "04250326"
      - cell "Ram"
      - cell "Sen"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
    - row " Richardkiki akhillk Johnsontae HR Manager Full-Time Permanent Human Resources ":
      - cell "":
        - checkbox ""
        - text: 
      - cell
      - cell "Richardkiki akhillk"
      - cell "Johnsontae"
      - cell "HR Manager"
      - cell "Full-Time Permanent"
      - cell "Human Resources"
      - cell
      - cell "":
        - button ""
    - row " 0437 Shivam Kumar Singh  ":
      - cell "":
        - checkbox ""
        - text: 
      - cell "0437"
      - cell "Shivam Kumar"
      - cell "Singh"
      - cell
      - cell
      - cell
      - cell
      - cell " ":
        - button ""
        - button ""
- paragraph: OrangeHRM OS 5.8
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
```

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 1
Received array:  [[Object]]
```

# Test source

```ts
  1   | import { test, expect } from '../test-fixtures/index.js';
  2   | 
  3   | test.describe('Tables — Page Load', () => {
  4   |   test.beforeEach(async ({ employeeListPage }) => {
  5   |     await employeeListPage.goto();
  6   |   });
  7   | 
  8   |   test('TC01 - employee list page loads successfully', async ({ page }) => {
  9   |     await expect(page).toHaveURL(new RegExp('viewEmployeeList'));
  10  |   });
  11  | 
  12  |   test('TC02 - table has at least one row', async ({ employeeListPage }) => {
  13  |     await expect(employeeListPage.clickableRows.first()).toBeVisible();
  14  |   });
  15  | 
  16  |   test('TC03 - table shows rows by default', async ({ employeeListPage }) => {
  17  |     const count = await employeeListPage.clickableRows.count();
  18  |     expect(count).toBeGreaterThanOrEqual(10);
  19  |   });
  20  | 
  21  |   test('TC04-TC06 - employee list has all search controls visible and enabled', async ({ employeeListPage }) => {
  22  |     await expect.soft(employeeListPage.searchButton).toBeEnabled();
  23  |     await expect.soft(employeeListPage.resetButton).toBeVisible();
  24  |     await expect.soft(employeeListPage.paginationList).toBeVisible();
> 25  |     expect(test.info().errors).toHaveLength(0);
      |                                ^ Error: expect(received).toHaveLength(expected)
  26  |   });
  27  | });
  28  | 
  29  | test.describe('Tables — Sorting', () => {
  30  |   test.beforeEach(async ({ employeeListPage }) => {
  31  |     await employeeListPage.goto();
  32  |   });
  33  | 
  34  |   test('TC07 - clicking a column header changes row order', async ({ employeeListPage }) => {
  35  |     const { before, after } = await employeeListPage.sortByColumn(1);
  36  |     expect(before).not.toEqual(after);
  37  |   });
  38  | 
  39  |   test('TC08 - table rows are present after sorting', async ({ employeeListPage }) => {
  40  |     const { after } = await employeeListPage.sortByColumn(1);
  41  |     expect(after.length).toBeGreaterThan(0);
  42  |   });
  43  | 
  44  |   test('TC09 - clicking same header again reverses order', async ({ employeeListPage }) => {
  45  |     const { after: ascRows }  = await employeeListPage.sortByColumn(1, 'Ascending');
  46  |     const { after: descRows } = await employeeListPage.sortByColumn(1, 'Descending');
  47  |     expect(ascRows).not.toEqual(descRows);
  48  |   });
  49  | });
  50  | 
  51  | test.describe('Tables — Pagination', () => {
  52  |   test.beforeEach(async ({ employeeListPage }) => {
  53  |     await employeeListPage.goto();
  54  |   });
  55  | 
  56  |   test('TC10 - more than one page exists', async ({ employeeListPage }) => {
  57  |     const totalPages = await employeeListPage.getTotalPageCount();
  58  |     expect(totalPages).toBeGreaterThan(1);
  59  |   });
  60  | 
  61  |   test('TC11 - page 2 shows different records than page 1', async ({ employeeListPage }) => {
  62  |     const page1First = await employeeListPage.getFirstRowText();
  63  |     await employeeListPage.goToPage(2);
  64  |     const page2First = await employeeListPage.getFirstRowText();
  65  |     expect(page1First).not.toEqual(page2First);
  66  |   });
  67  | 
  68  |   test('TC12 - page 3 shows different records than page 2', async ({ employeeListPage }) => {
  69  |     await employeeListPage.goToPage(2);
  70  |     const page2First = await employeeListPage.getFirstRowText();
  71  |     await employeeListPage.goToPage(3);
  72  |     const page3First = await employeeListPage.getFirstRowText();
  73  |     expect(page2First).not.toEqual(page3First);
  74  |   });
  75  | 
  76  |   test('TC13 - navigating back to page 1 restores first page records', async ({ employeeListPage }) => {
  77  |     const page1First = await employeeListPage.getFirstRowText();
  78  |     await employeeListPage.goToPage(2);
  79  |     await employeeListPage.goToPage(1);
  80  |     const backToPage1 = await employeeListPage.getFirstRowText();
  81  |     expect(page1First).toEqual(backToPage1);
  82  |   });
  83  | 
  84  |   test('TC14 - page 1 button has selected styling', async ({ employeeListPage }) => {
  85  |     await expect(employeeListPage.selectedPageBtn).toBeVisible();
  86  |   });
  87  | });
  88  | 
  89  | test.describe('Tables — Filtering', () => {
  90  |   test.beforeEach(async ({ employeeListPage }) => {
  91  |     await employeeListPage.goto();
  92  |   });
  93  | 
  94  |   test('TC15 - filtering by a known name returns fewer rows', async ({ employeeListPage }) => {
  95  |     const totalBefore = await employeeListPage.getRowCount();
  96  |     await employeeListPage.filterByName('Admin');
  97  |     const totalAfter = await employeeListPage.getRowCount();
  98  |     expect(totalAfter).toBeLessThanOrEqual(totalBefore);
  99  |   });
  100 | 
  101 |   test('TC16 - filtering by nonexistent name shows no records message', async ({ employeeListPage }) => {
  102 |     await employeeListPage.filterByName('ZZZNOTEXIST999');
  103 |     await expect(employeeListPage.noRecordsMessage.first()).toContainText('No Records Found');
  104 |   });
  105 | 
  106 |   test('TC17 - reset filter restores records', async ({ employeeListPage }) => {
  107 |     await employeeListPage.filterByName('Admin');
  108 |     await employeeListPage.resetFilter();
  109 |     const count = await employeeListPage.getRowCount();
  110 |     expect(count).toBeGreaterThanOrEqual(10);
  111 |   });
  112 | 
  113 |   test('TC18 - edit button navigates to employee detail page', async ({ page, employeeListPage }) => {
  114 |     await employeeListPage.clickEdit(0);
  115 |     await expect(page).toHaveURL(new RegExp('viewPersonalDetails'));
  116 |   });
  117 | 
  118 |   test('TC19 - employee table has correct structure with headers, rows and pagination', async ({ employeeListPage }) => {
  119 |     const headerCount = await employeeListPage.columnHeaders.count();
  120 |     const rowCount    = await employeeListPage.clickableRows.count();
  121 |     await expect.soft(employeeListPage.filterInput).toHaveAttribute('placeholder', 'Type for hints...');
  122 |     await expect.soft(employeeListPage.selectedPageBtn).toHaveText('1');
  123 |     expect.soft(headerCount).toBeGreaterThanOrEqual(5);
  124 |     expect.soft(rowCount).toBeGreaterThanOrEqual(10);
  125 |     expect(test.info().errors).toHaveLength(0);
```