import request from 'supertest';
import app from '../index.js';

describe('POST /api/users', () => {
  it('debería crear un usuario', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  it('debería fallar con email inválido', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        email: 'no-es-email',
        password: '123456',
      });
    expect(res.statusCode).toEqual(400);
  });
});
