import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { LoginPage } from './pages/LoginPage.js';

export default async function globalSetup() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ baseURL: process.env.BASE_URL });
  const page    = await context.newPage();

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
  await page.waitForURL('**' + loginPage.dashboardUrl);

  await page.context().storageState({ path: 'auth.json' });
  console.log('✓ Global setup: logged in and session saved to auth.json');

  await browser.close();
}
