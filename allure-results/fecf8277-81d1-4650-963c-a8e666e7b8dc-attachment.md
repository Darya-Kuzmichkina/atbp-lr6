# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: salary.spec.js >> Калькулятор зарплаты >> ошибка при отрицательном ID
- Location: e2e\salary.spec.js:54:1

# Error details

```
Error: page.goto: NS_ERROR_CONNECTION_REFUSED
Call log:
  - navigating to "http://localhost:3000/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - heading [level=1] [ref=e5]
  - paragraph
  - paragraph
```

# Test source

```ts
  1  | class SalaryPage {
  2  |     constructor(page) {
  3  |         this.page = page;
  4  |         this.idInput = '#employeeId';
  5  |         this.rateInput = '#rate';
  6  |         this.button = '#calcBtn';
  7  |         this.result = '#result';
  8  |         this.error = '#error';
  9  |     }
  10 | 
  11 |     async open() {
> 12 |         await this.page.goto('http://localhost:3000');
     |                         ^ Error: page.goto: NS_ERROR_CONNECTION_REFUSED
  13 |     }
  14 | 
  15 |     async setId(id) {
  16 |         await this.page.fill(this.idInput, String(id));
  17 |     }
  18 | 
  19 |     async setRate(rate) {
  20 |         await this.page.fill(this.rateInput, String(rate));
  21 |     }
  22 | 
  23 |     async submit() {
  24 |         await this.page.click(this.button);
  25 |     }
  26 | 
  27 |     async getResult() {
  28 |         const el = this.page.locator(this.result);
  29 |         await el.waitFor({ state: 'visible' }); // ждем появления
  30 |         return el.textContent();
  31 |     }
  32 | 
  33 |     async getError() {
  34 |         const el = this.page.locator(this.error);
  35 |         await el.waitFor({ state: 'visible' }); // ждем появления
  36 |         return el.textContent();
  37 |     }
  38 | }
  39 | 
  40 | module.exports = SalaryPage;
```