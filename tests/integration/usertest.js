const request = require('supertest');
const app = require('../../app');
const { sequelize } = require('../../src/models');

beforeAll(async () => {
  // en test usamos sync para crear tablas desde los modelos (o usar migraciones test)
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

test('POST /api/users crea usuario', async () => {
  const res = await request(app)
    .post('/api/users')
    .send({ name: 'Pepito', email: 'pepito@example.com', password: '123456' });

  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('id');
  expect(res.body).not.toHaveProperty('password');
});
