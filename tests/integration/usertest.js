import request from 'supertest';
import app from '../../src/models/index.js'; 

describe('POST /api/users', () => {
  it('debería crear un usuario', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'testuser', 
        email: 'test@example.com',
        password: '123456',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).not.toHaveProperty('password'); 
  });

  it('debería fallar con email inválido', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        name: 'testuser',
        email: 'no-es-email',
        password: '123456',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});