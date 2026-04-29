const request = require('supertest');
const app = require('../server');

describe('GET /api/tracker/:employeeId', () => {
  test('возвращает часы для сотрудника 1 (150 часов)', async () => {
    const res = await request(app).get('/api/tracker/1');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.hours).toBe(150);
  });

  test('возвращает часы для сотрудника 2 (170 часов)', async () => {
    const res = await request(app).get('/api/tracker/2');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.hours).toBe(170);
  });

  test('возвращает 404 для несуществующего сотрудника', async () => {
    const res = await request(app).get('/api/tracker/999');
    expect(res.status).toBe(404);
    expect(res.body.status).toBe('error');
  });
});

describe('POST /api/salary/calculate', () => {
  test('расчёт зарплаты без сверхурочных (150 часов, ставка 1000)', async () => {
    const res = await request(app)
      .post('/api/salary/calculate')
      .send({ hours: 150, hourRate: 1000 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.totalSalary).toBe(150000);
  });

  test('расчёт зарплаты со сверхурочными (170 часов, ставка 1000)', async () => {
    const res = await request(app)
      .post('/api/salary/calculate')
      .send({ hours: 170, hourRate: 1000 });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    // 160*1000 + 10*1000*1.5 = 160000 + 15000 = 175000
    expect(res.body.totalSalary).toBe(175000);
  });

  test('ошибка при превышении лимита часов (800 часов)', async () => {
    const res = await request(app)
      .post('/api/salary/calculate')
      .send({ hours: 800, hourRate: 1000 });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toContain('Превышен');
  });

  test('ошибка при некорректной ставке (0)', async () => {
    const res = await request(app)
      .post('/api/salary/calculate')
      .send({ hours: 100, hourRate: 0 });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  test('ошибка при отрицательной ставке', async () => {
    const res = await request(app)
      .post('/api/salary/calculate')
      .send({ hours: 100, hourRate: -500 });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });
});
