const { test, expect } = require('@playwright/test');
const SalaryPage = require('../tests/pages/SalaryPage');

test.describe('Калькулятор зарплаты', () => {

    test('расчет для 150 часов', async ({ page }) => {
        const sp = new SalaryPage(page);

        await sp.open();
        await sp.setId(1);
        await sp.setRate(10);
        await sp.submit();

        const result = await sp.getResult();
        expect(result).toContain('часы: 150');
    });

    test('сверхурочные 170 часов', async ({ page }) => {
        const sp = new SalaryPage(page);

        await sp.open();
        await sp.setId(2);
        await sp.setRate(10);
        await sp.submit();

        const result = await sp.getResult();
        expect(result).toContain('часы: 170');
    });

    test('ошибка при неверном ID', async ({ page }) => {
        const sp = new SalaryPage(page);

        await sp.open();
        await sp.setId(999);
        await sp.setRate(10);
        await sp.submit();

        const error = await sp.getError();
        expect(error.length).toBeGreaterThan(0);
    });

    test('ошибка при нечисловом ID', async ({ page }) => {
    const sp = new SalaryPage(page);

    await sp.open();
    await sp.setId('abc');
    await sp.setRate(10);
    await sp.submit();

    const error = await sp.getError();
    expect(error.length).toBeGreaterThan(0);
});

test('ошибка при отрицательном ID', async ({ page }) => {
    const sp = new SalaryPage(page);

    await sp.open();
    await sp.setId(-1);
    await sp.setRate(10);
    await sp.submit();

    const error = await sp.getError();
    expect(error.length).toBeGreaterThan(0);
});
});