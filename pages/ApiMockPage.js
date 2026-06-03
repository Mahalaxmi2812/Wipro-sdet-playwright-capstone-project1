export class ApiMockPage {
  constructor(page) {
    this.page = page;

    // API endpoints to intercept
    this.employeeListEndpoint = '**/api/v2/pim/employees**';
    this.directoriesEndpoint  = '**/api/v2/directory/employees**';
    //this.jobTitlesEndpoint    = '**/api/v2/admin/job-titles**';  

    //In employeelist page, the API call is made with query params, so we use a wildcard pattern to match any query string.
    // https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC
    //same with directory page and job titles page

    // Page URLs
    this.employeeListUrl = '/web/index.php/pim/viewEmployeeList';
    this.directoryUrl    = '/web/index.php/directory/viewDirectory';

    // Locators
    this.tableRows    = page.locator('.oxd-table-row.oxd-table-row--with-border');
    this.clickableRows = page.locator('.oxd-table-row.oxd-table-row--with-border.oxd-table-row--clickable');
    this.resultCards  = page.locator('.orangehrm-directory-card');
    this.noRecords    = page.locator('span').filter({ hasText: 'No Records Found' });
  }

  async gotoEmployeeList() {
    await this.page.goto(this.employeeListUrl);
    await this.page.waitForLoadState('load');
  }

  async gotoDirectory() {
    await this.page.goto(this.directoryUrl);
    await this.page.waitForLoadState('load');
  }

  async mockSuccess(payload) {
    const defaultPayload = {
      data: [
        { empNumber: 1, firstName: 'Mock', lastName: 'Employee', jobTitle: { label: 'QA Engineer' } },
        { empNumber: 2, firstName: 'Fake', lastName: 'Person',   jobTitle: { label: 'Developer'  } },
      ],
      meta: { total: 2 },
    };
    await this.page.route(this.employeeListEndpoint, route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(payload ?? defaultPayload),
      })
    );
  }

  async mockError(status = 500) {
    await this.page.route(this.employeeListEndpoint, route =>
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify({ error: `Simulated ${status} error` }),
      })
    );
  }

  async mockEmpty() {
    await this.page.route(this.employeeListEndpoint, route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [], meta: { total: 0 } }),
      })
    );
  }

  async mockEmptyDirectory() {
    await this.page.route(this.directoriesEndpoint, route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [], meta: { total: 0 } }),
      })
    );
  }

  async mockSlow(delayMs = 2000) {
    await this.page.route(this.employeeListEndpoint, async route => {
      await new Promise(r => setTimeout(r, delayMs));
      await route.continue(); //// let real request through — just delayed
    });
  }

  async interceptAndModify(modifyFn) {
    await this.page.route(this.employeeListEndpoint, async route => {
      const response = await route.fetch();  //get real response
      const json     = await response.json(); //parse it
      const modified = modifyFn 
        ? modifyFn(json)
        : (() => {
            if (json.data?.[0]) json.data[0].firstName = 'Injected';
            return json;
          })();
      await route.fulfill({ json: modified });
    });
  }
}
