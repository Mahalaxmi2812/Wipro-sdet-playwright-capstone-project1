# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.js >> Search — Directory >> TC06 - search input field is visible on directory page
- Location: tests/search.spec.js:35:3

# Error details

```
TimeoutError: locator.waitFor: Timeout 60000ms exceeded.
Call log:
  - waiting for locator('.orangehrm-directory-card').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e6]:
    - img "company-branding" [ref=e8]
    - generic [ref=e9]:
      - heading "Login" [level=5] [ref=e10]
      - generic [ref=e11]:
        - generic [ref=e13]:
          - paragraph [ref=e14]: "Username : Admin"
          - paragraph [ref=e15]: "Password : admin123"
        - generic [ref=e16]:
          - generic [ref=e18]:
            - generic [ref=e19]:
              - generic [ref=e20]: 
              - generic [ref=e21]: Username
            - textbox "Username" [active] [ref=e23]
          - generic [ref=e25]:
            - generic [ref=e26]:
              - generic [ref=e27]: 
              - generic [ref=e28]: Password
            - textbox "Password" [ref=e30]
          - button "Login" [ref=e32] [cursor=pointer]
          - paragraph [ref=e34] [cursor=pointer]: Forgot your password?
      - generic [ref=e35]:
        - generic [ref=e36]:
          - link [ref=e37]:
            - /url: https://www.linkedin.com/company/orangehrm/mycompany/
          - link [ref=e40]:
            - /url: https://www.facebook.com/OrangeHRM/
          - link [ref=e43]:
            - /url: https://twitter.com/orangehrm?lang=en
          - link [ref=e46]:
            - /url: https://www.youtube.com/c/OrangeHRMInc
        - generic [ref=e49]:
          - paragraph [ref=e50]: OrangeHRM OS 5.8
          - paragraph [ref=e51]:
            - text: © 2005 - 2026
            - link "OrangeHRM, Inc" [ref=e52]:
              - /url: http://www.orangehrm.com
            - text: . All rights reserved.
  - img "orangehrm-logo" [ref=e54]
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | 
  3  | export class DirectoryPage {
  4  |   constructor(page) {
  5  |     this.page = page;
  6  | 
  7  |     this.url = '/web/index.php/directory/viewDirectory';
  8  | 
  9  |     this.nameInput      = page.locator("input[placeholder='Type for hints...']").first();
  10 |     this.searchButton   = page.locator("button[type='submit']");
  11 |     this.resetButton    = page.locator("button[type='reset']");
  12 |     this.resultCards    = page.locator('.orangehrm-directory-card');
  13 |     this.invalidMessage = page.getByText('Invalid');
  14 |   }
  15 | 
  16 |   async goto() {
  17 |     await this.page.goto(this.url);
  18 |     await this.page.waitForLoadState('load');
> 19 |     await this.resultCards.first().waitFor({ state: 'visible', timeout: 60000 });
     |                                    ^ TimeoutError: locator.waitFor: Timeout 60000ms exceeded.
  20 |   }
  21 | 
  22 |   async search(name) {
  23 |     await this.nameInput.fill(name);
  24 |     await this.searchButton.click();
  25 |     await this.page.waitForLoadState('load');
  26 |   }
  27 | 
  28 |   async reset() {
  29 |     await this.resetButton.click();
  30 |     await this.page.waitForLoadState('load');
  31 |     await this.resultCards.first().waitFor({ state: 'visible', timeout: 60000 });
  32 |   }
  33 | 
  34 |   async getResultCardCount() {
  35 |     await this.page.waitForLoadState('load');
  36 |     return this.resultCards.count();
  37 |   }
  38 | }
  39 | 
```