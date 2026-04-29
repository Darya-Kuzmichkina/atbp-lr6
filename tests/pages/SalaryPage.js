class SalaryPage {
    constructor(page) {
        this.page = page;
        this.idInput = '#employeeId';
        this.rateInput = '#rate';
        this.button = '#calcBtn';
        this.result = '#result';
        this.error = '#error';
    }

    async open() {
        await this.page.goto('http://localhost:3000');
    }

    async setId(id) {
        await this.page.fill(this.idInput, String(id));
    }

    async setRate(rate) {
        await this.page.fill(this.rateInput, String(rate));
    }

    async submit() {
        await this.page.click(this.button);
    }

    async getResult() {
        const el = this.page.locator(this.result);
        await el.waitFor({ state: 'visible' }); // ждем появления
        return el.textContent();
    }

    async getError() {
        const el = this.page.locator(this.error);
        await el.waitFor({ state: 'visible' }); // ждем появления
        return el.textContent();
    }
}

module.exports = SalaryPage;