# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: notifications.spec.js >> Notifications — Validation Errors >> TC12 - last name required error message is visible
- Location: tests/notifications.spec.js:81:3

# Error details

```
TimeoutError: locator.waitFor: Timeout 60000ms exceeded.
Call log:
  - waiting for locator('[name=\'firstName\']') to be visible

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e6]:
    - img "company-branding" [ref=e8]
    - generic [ref=e9]:
      - heading "Login" [level=5] [ref=e10]
      - generic [ref=e11]:
        - generic [ref=e12]:
          - alert [ref=e13]:
            - generic [ref=e14]:
              - generic [ref=e15]: 
              - paragraph [ref=e16]: Session Expired
          - generic [ref=e18]:
            - paragraph [ref=e19]: "Username : Admin"
            - paragraph [ref=e20]: "Password : admin123"
        - generic [ref=e21]:
          - generic [ref=e23]:
            - generic [ref=e24]:
              - generic [ref=e25]: 
              - generic [ref=e26]: Username
            - textbox "Username" [active] [ref=e28]
          - generic [ref=e30]:
            - generic [ref=e31]:
              - generic [ref=e32]: 
              - generic [ref=e33]: Password
            - textbox "Password" [ref=e35]
          - button "Login" [ref=e37] [cursor=pointer]
          - paragraph [ref=e39] [cursor=pointer]: Forgot your password?
      - generic [ref=e40]:
        - generic [ref=e41]:
          - link [ref=e42]:
            - /url: https://www.linkedin.com/company/orangehrm/mycompany/
          - link [ref=e45]:
            - /url: https://www.facebook.com/OrangeHRM/
          - link [ref=e48]:
            - /url: https://twitter.com/orangehrm?lang=en
          - link [ref=e51]:
            - /url: https://www.youtube.com/c/OrangeHRMInc
        - generic [ref=e54]:
          - paragraph [ref=e55]: OrangeHRM OS 5.8
          - paragraph [ref=e56]:
            - text: © 2005 - 2026
            - link "OrangeHRM, Inc" [ref=e57]:
              - /url: http://www.orangehrm.com
            - text: . All rights reserved.
  - img "orangehrm-logo" [ref=e59]
```

# Test source

```ts
  1  | import { expect } from '@playwright/test';
  2  | 
  3  | export class EmployeePage {
  4  |   constructor(page) {
  5  |     this.page = page;
  6  | 
  7  |     this.url = '/web/index.php/pim/addEmployee';
  8  | 
  9  |     // Form fields
  10 |     this.firstNameField  = page.locator("[name='firstName']");
  11 |     this.middleNameField = page.locator("[name='middleName']");
  12 |     this.lastNameField   = page.locator("[name='lastName']");
  13 |     this.employeeIdField = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
  14 |     this.saveButton      = page.locator("button[type='submit']");
  15 |     this.cancelButton    = page.locator("button[type='button']:has-text('Cancel')");
  16 |     this.errorMessage    = page.locator('.oxd-text.oxd-text--span.oxd-input-field-error-message');
  17 |     this.errorInput      = page.locator('.oxd-input.oxd-input--error');
  18 | 
  19 |     // Login details toggle (dynamic fields)
  20 |     this.createLoginToggle  = page.locator('.oxd-switch-input');
  21 |     this.loginUsernameField = page.locator("input[autocomplete='off']").first();
  22 |     this.loginPasswordField = page.locator("input[type='password']").first();
  23 | 
  24 |     // Toast notifications
  25 |     this.successToast   = page.locator('.oxd-toast.oxd-toast--success');
  26 |     this.errorToast     = page.locator('.oxd-toast.oxd-toast--error');
  27 |     this.toastContainer = page.locator('.oxd-toast-container.oxd-toast-container--bottom');
  28 |     this.toastTitle     = page.locator('.oxd-text--toast-title.oxd-toast-content-text');
  29 |     this.toastMessage   = page.locator('.oxd-text--toast-message.oxd-toast-content-text');
  30 |     this.toastCloseBtn  = page.locator('.oxd-toast-close');
  31 |   }
  32 | 
  33 |   async goto() {
  34 |     await this.page.goto(this.url);
  35 |     await this.page.waitForLoadState('load');
> 36 |     await this.firstNameField.waitFor({ state: 'visible', timeout: 60000 });
     |                               ^ TimeoutError: locator.waitFor: Timeout 60000ms exceeded.
  37 |   }
  38 | 
  39 |   async fillForm({ firstName = '', middleName = '', lastName = '' } = {}) {
  40 |     await this.firstNameField.fill(firstName);
  41 |     if (middleName) await this.middleNameField.fill(middleName);
  42 |     await this.lastNameField.fill(lastName);
  43 |     await this.employeeIdField.clear();
  44 |     await this.employeeIdField.fill(`EMP${Date.now().toString().slice(-6)}`);
  45 |   }
  46 | 
  47 |   async submit() {
  48 |     await this.saveButton.click();
  49 |   }
  50 | 
  51 |   async fillAndSubmit(employee) {
  52 |     await this.fillForm(employee);
  53 |     await this.submit();
  54 |   }
  55 | 
  56 |   async triggerSuccessToast({ firstName, lastName } = {}) {
  57 |     await this.goto();
  58 |     await this.firstNameField.fill(firstName ?? 'Test');
  59 |     await this.lastNameField.fill(lastName ?? 'User');
  60 |     await this.employeeIdField.clear();
  61 |     await this.employeeIdField.fill(`EMP${Date.now().toString().slice(-6)}`);
  62 |     await this.submit();
  63 |     await expect(this.successToast).toBeVisible({ timeout: 15000 });
  64 |   }
  65 | 
  66 |   async triggerErrorNotification() {
  67 |     await this.goto();
  68 |     await this.submit();
  69 |     await expect(this.errorMessage.first()).toBeVisible();
  70 |   }
  71 | 
  72 |   async toggleLoginDetails(enable = true) {
  73 |     const isChecked = await this.createLoginToggle.isChecked();
  74 |     if (enable && !isChecked) await this.createLoginToggle.click();
  75 |     if (!enable && isChecked) await this.createLoginToggle.click();
  76 |   }
  77 | }
  78 | 
```