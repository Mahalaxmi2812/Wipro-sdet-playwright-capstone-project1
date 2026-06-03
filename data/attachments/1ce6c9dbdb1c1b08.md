# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tables.spec.js >> Tables — Sorting >> TC07 - clicking a column header changes row order
- Location: tests/tables.spec.js:34:3

# Error details

```
TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
Call log:
  - waiting for locator('.oxd-table-row.oxd-table-row--with-border.oxd-table-row--clickable').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic:
    - complementary [ref=e4]:
      - navigation "Sidepanel" [ref=e5]:
        - generic [ref=e6]:
          - link "client brand banner" [ref=e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=e9]
          - text: 
        - generic [ref=e10]:
          - generic [ref=e11]:
            - generic [ref=e12]:
              - textbox "Search" [ref=e15]
              - button "" [ref=e16] [cursor=pointer]:
                - generic [ref=e17]: 
            - separator [ref=e18]
          - list [ref=e19]:
            - listitem [ref=e20]:
              - link "Admin" [ref=e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
                - generic [ref=e24]: Admin
            - listitem [ref=e25]:
              - link "PIM" [ref=e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
                - generic [ref=e40]: PIM
            - listitem [ref=e41]:
              - link "Leave" [ref=e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
                - generic [ref=e45]: Leave
            - listitem [ref=e46]:
              - link "Time" [ref=e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
                - generic [ref=e53]: Time
            - listitem [ref=e54]:
              - link "Recruitment" [ref=e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
                - generic [ref=e61]: Recruitment
            - listitem [ref=e62]:
              - link "My Info" [ref=e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
                - generic [ref=e69]: My Info
            - listitem [ref=e70]:
              - link "Performance" [ref=e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
                - generic [ref=e79]: Performance
            - listitem [ref=e80]:
              - link "Dashboard" [ref=e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
                - generic [ref=e84]: Dashboard
            - listitem [ref=e85]:
              - link "Directory" [ref=e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
                - generic [ref=e89]: Directory
            - listitem [ref=e90]:
              - link "Maintenance" [ref=e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
                - generic [ref=e95]: Maintenance
            - listitem [ref=e96]:
              - link "Claim" [ref=e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
                - img [ref=e100]
                - generic [ref=e104]: Claim
            - listitem [ref=e105]:
              - link "Buzz" [ref=e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
                - generic [ref=e109]: Buzz
    - banner [ref=e110]:
      - generic [ref=e111]:
        - generic [ref=e112]:
          - text: 
          - heading "PIM" [level=6] [ref=e114]
        - link "Upgrade" [ref=e116]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=e117] [cursor=pointer]: Upgrade
        - list [ref=e123]:
          - listitem [ref=e124]:
            - generic [ref=e125] [cursor=pointer]:
              - img "profile picture" [ref=e126]
              - paragraph [ref=e127]: Test Test
              - generic [ref=e128]: 
      - navigation "Topbar Menu" [ref=e130]:
        - list [ref=e131]:
          - listitem [ref=e132] [cursor=pointer]:
            - generic [ref=e133]:
              - text: Configuration
              - generic [ref=e134]: 
          - listitem [ref=e135] [cursor=pointer]:
            - link "Employee List" [ref=e136]:
              - /url: "#"
          - listitem [ref=e137] [cursor=pointer]:
            - link "Add Employee" [ref=e138]:
              - /url: "#"
          - listitem [ref=e139] [cursor=pointer]:
            - link "Reports" [ref=e140]:
              - /url: "#"
          - button "" [ref=e142] [cursor=pointer]:
            - generic [ref=e143]: 
  - generic [ref=e144]:
    - generic [ref=e146]:
      - generic [ref=e147]:
        - generic [ref=e148]:
          - heading "Employee Information" [level=5] [ref=e150]
          - button "" [ref=e153] [cursor=pointer]:
            - generic [ref=e154]: 
        - separator [ref=e155]
        - generic [ref=e157]:
          - generic [ref=e159]:
            - generic [ref=e161]:
              - generic [ref=e163]: Employee Name
              - textbox "Type for hints..." [ref=e167]
            - generic [ref=e169]:
              - generic [ref=e171]: Employee Id
              - textbox [ref=e173]
            - generic [ref=e175]:
              - generic [ref=e177]: Employment Status
              - generic [ref=e180] [cursor=pointer]:
                - generic [ref=e181]: "-- Select --"
                - generic [ref=e183]: 
            - generic [ref=e185]:
              - generic [ref=e187]: Include
              - generic [ref=e190] [cursor=pointer]:
                - generic [ref=e191]: Current Employees Only
                - generic [ref=e193]: 
            - generic [ref=e195]:
              - generic [ref=e197]: Supervisor Name
              - textbox "Type for hints..." [ref=e201]
            - generic [ref=e203]:
              - generic [ref=e205]: Job Title
              - generic [ref=e208] [cursor=pointer]:
                - generic [ref=e209]: "-- Select --"
                - generic [ref=e211]: 
            - generic [ref=e213]:
              - generic [ref=e215]: Sub Unit
              - generic [ref=e218] [cursor=pointer]:
                - generic [ref=e219]: "-- Select --"
                - generic [ref=e221]: 
          - separator [ref=e222]
          - generic [ref=e223]:
            - button "Reset" [ref=e224] [cursor=pointer]
            - button "Search" [ref=e225] [cursor=pointer]
      - generic [ref=e226]:
        - button " Add" [ref=e228] [cursor=pointer]:
          - generic [ref=e229]: 
          - text: Add
        - generic [ref=e230]:
          - separator [ref=e231]
          - generic [ref=e233]: (343) Records Found
        - table [ref=e235]:
          - rowgroup [ref=e236]:
            - row " Id  First (& Middle) Name  Last Name  Job Title  Employment Status  Sub Unit  Supervisor  Actions" [ref=e237]:
              - columnheader "" [ref=e238]:
                - generic [ref=e240] [cursor=pointer]:
                  - checkbox "" [ref=e241]
                  - generic [ref=e243]: 
              - columnheader "Id " [ref=e244]:
                - text: Id
                - generic [ref=e245]:
                  - generic [ref=e246] [cursor=pointer]: 
                  - text:  
              - columnheader "First (& Middle) Name " [ref=e247]:
                - text: First (& Middle) Name
                - generic [ref=e248]:
                  - generic [ref=e249] [cursor=pointer]: 
                  - text:  
              - columnheader "Last Name " [ref=e250]:
                - text: Last Name
                - generic [ref=e251]:
                  - generic [ref=e252] [cursor=pointer]: 
                  - text:  
              - columnheader "Job Title " [ref=e253]:
                - text: Job Title
                - generic [ref=e254]:
                  - generic [ref=e255] [cursor=pointer]: 
                  - text:  
              - columnheader "Employment Status " [ref=e256]:
                - text: Employment Status
                - generic [ref=e257]:
                  - generic [ref=e258] [cursor=pointer]: 
                  - text:  
              - columnheader "Sub Unit " [ref=e259]:
                - text: Sub Unit
                - generic [ref=e260]:
                  - generic [ref=e261] [cursor=pointer]: 
                  - text:  
              - columnheader "Supervisor " [ref=e262]:
                - text: Supervisor
                - generic [ref=e263]:
                  - generic [ref=e264] [cursor=pointer]: 
                  - text:  
              - columnheader "Actions" [ref=e265]
          - rowgroup
        - navigation "Pagination Navigation" [ref=e267]:
          - list [ref=e268]:
            - listitem [ref=e269]:
              - button "1" [ref=e270] [cursor=pointer]
            - listitem [ref=e271]:
              - button "2" [ref=e272] [cursor=pointer]
            - listitem [ref=e273]:
              - button "3" [ref=e274] [cursor=pointer]
            - listitem [ref=e275]:
              - button "4" [ref=e276] [cursor=pointer]
            - listitem [ref=e277]:
              - button "5" [ref=e278] [cursor=pointer]
            - listitem [ref=e279]:
              - button "" [ref=e280] [cursor=pointer]:
                - generic [ref=e281]: 
    - generic [ref=e282]:
      - paragraph [ref=e283]: OrangeHRM OS 5.8
      - paragraph [ref=e284]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=e285] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | 
  3  | export class EmployeeListPage {
  4  |   constructor(page) {
  5  |     this.page = page;
  6  | 
  7  |     this.url = '/web/index.php/pim/viewEmployeeList';
  8  | 
  9  |     this.clickableRows   = page.locator('.oxd-table-row.oxd-table-row--with-border.oxd-table-row--clickable');
  10 |     this.paginationList  = page.locator('.oxd-pagination__ul');
  11 |     this.pageButtons     = page.locator('.oxd-pagination-page-item.oxd-pagination-page-item--page');
  12 |     this.selectedPageBtn = page.locator('.oxd-pagination-page-item--page-selected');
  13 |     this.filterInput     = page.locator("input[placeholder='Type for hints...']").first();
  14 |     this.searchButton    = page.locator("button[type='submit']");
  15 |     this.resetButton     = page.locator("button[type='reset']");
  16 |     this.columnHeaders      = page.locator('.oxd-table-header-cell');
  17 |     this.noRecordsMessage   = page.getByText('No Records Found');
  18 |     this.autocompleteOption = page.locator('.oxd-autocomplete-option');
  19 |   }
  20 | 
  21 |   async goto() {
  22 |     await this.page.goto(this.url);
  23 |     await this.page.waitForLoadState('load');
  24 |     await this.clickableRows.first().waitFor({ state: 'visible', timeout: 60000 });
  25 |   }
  26 | 
  27 |   async sortByColumn(columnIndex = 1, direction = 'Ascending') {
  28 |     await this.clickableRows.first().waitFor({ state: 'visible' });
  29 |     const before = await this.clickableRows.allTextContents();
  30 | 
  31 |     // Step 1: click the column header to reveal the sort icon
  32 |     await this.columnHeaders.nth(columnIndex).click();
  33 | 
  34 |     // Step 2: click the sort icon (handles all states: unsorted, asc, desc)
  35 |     await this.page.locator(
  36 |       '.oxd-icon.bi-arrow-down-up, .oxd-icon.bi-sort-alpha-up, .oxd-icon.bi-sort-alpha-down'
  37 |     ).first().click();
  38 | 
  39 |     // Step 3: pick Ascending or Descending from the dropdown
  40 |     await this.page.getByRole('listitem').filter({ hasText: direction }).click();
  41 | 
  42 |     await this.page.waitForLoadState('load');
> 43 |     await this.clickableRows.first().waitFor({ state: 'visible' });
     |                                      ^ TimeoutError: locator.waitFor: Timeout 30000ms exceeded.
  44 |     const after = await this.clickableRows.allTextContents();
  45 |     return { before, after };
  46 |   }
  47 | 
  48 |   async goToPage(pageNumber) {
  49 |     const btn = this.pageButtons.filter({ hasText: String(pageNumber) });
  50 |     await expect(btn).toBeVisible();
  51 |     await btn.click();
  52 |     await this.page.waitForLoadState('load');
  53 |     await this.clickableRows.first().waitFor({ state: 'visible' });
  54 |   }
  55 | 
  56 |   async getFirstRowText() {
  57 |     await this.clickableRows.first().waitFor({ state: 'visible' });
  58 |     return this.clickableRows.first().textContent();
  59 |   }
  60 | 
  61 |   async getTotalPageCount() {
  62 |     return this.pageButtons.count();
  63 |   }
  64 | 
  65 |   async filterByName(name) {
  66 |     await this.filterInput.fill(name);
  67 |     await this.searchButton.click();
  68 |     await this.page.waitForLoadState('load');
  69 |     await Promise.race([
  70 |       this.clickableRows.first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
  71 |       this.noRecordsMessage.first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {}),
  72 |     ]);
  73 |   }
  74 | 
  75 |   async resetFilter() {
  76 |     await this.resetButton.click();
  77 |     await this.page.waitForLoadState('load');
  78 |     await this.clickableRows.first().waitFor({ state: 'visible' });
  79 |   }
  80 | 
  81 |   async getRowCount() {
  82 |     await this.page.waitForLoadState('load');
  83 |     return this.clickableRows.count();
  84 |   }
  85 | 
  86 |   async clickEdit(rowIndex = 0) {
  87 |     await this.clickableRows.first().waitFor({ state: 'visible' });
  88 |     await this.clickableRows.nth(rowIndex).getByRole('button').filter({ hasText: /^$/ }).first().click();
  89 |     await this.page.waitForURL('**/pim/viewPersonalDetails/**');
  90 |   }
  91 | }
  92 | 
```