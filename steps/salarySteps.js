const { Given, When, Then } = require('@cucumber/cucumber');
const request = require('supertest');
const app = require('../server');
//Step Definitions
let payload = {};
let response;

Given('сервис доступен по адресу {string}', async function (path) {
  const res = await request(app).get(path);
  if (res.status !== 200) {
    throw new Error('Сервис недоступен');
  }
});

Given('сотрудник имеет {int} часов', function (hours) {
  payload.hours = hours;
});

Given('ставка равна {int}', function (rate) {
  payload.hourRate = rate;
});

When('я отправляю POST запрос на {string}', async function (path) {
  response = await request(app)
    .post(path)
    .send(payload);
});

Then('API возвращает статус-код {int}', function (code) {
  if (response.status !== code) {
    throw new Error(`Ожидался ${code}, получен ${response.status}`);
  }
});

Then('ответ содержит {string}', function (text) {
  if (response.status === 200) {
    if (response.body.status !== text) {
      throw new Error('Неверный статус ответа');
    }

    const hours = payload.hours;
    const rate = payload.hourRate;

    let expected;

    if (hours > 160) {
      const overtime = hours - 160;
      expected = (160 * rate) + (overtime * rate * 1.5);
    } else {
      expected = hours * rate;
    }

    if (response.body.totalSalary !== expected) {
      throw new Error('Ошибка расчета зарплаты');
    }

  } else {
    if (!response.body.message.includes(text)) {
      throw new Error('Неверное сообщение об ошибке');
    }
  }
});