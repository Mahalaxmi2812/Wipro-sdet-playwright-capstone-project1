import { test as base, expect } from '@playwright/test';
import { LoginPage }           from '../pages/LoginPage.js';
import { EmployeePage }        from '../pages/EmployeePage.js';
import { EmployeeListPage }    from '../pages/EmployeeListPage.js';
import { DirectoryPage }       from '../pages/DirectoryPage.js';
import { JobTitlesPage }       from '../pages/JobTitlesPage.js';
import { EmployeeProfilePage } from '../pages/EmployeeProfilePage.js';
import { ApiMockPage }         from '../pages/ApiMockPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  employeePage: async ({ page }, use) => {
    await use(new EmployeePage(page));
  },

  employeeListPage: async ({ page }, use) => {
    await use(new EmployeeListPage(page));
  },

  directoryPage: async ({ page }, use) => {
    await use(new DirectoryPage(page));
  },

  jobTitlesPage: async ({ page }, use) => {
    await use(new JobTitlesPage(page));
  },

  employeeProfilePage: async ({ page }, use) => {
    await use(new EmployeeProfilePage(page));
  },

  apiMockPage: async ({ page }, use) => {
    await use(new ApiMockPage(page));
  },
});

export { expect };
