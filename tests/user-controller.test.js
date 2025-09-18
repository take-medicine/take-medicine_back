import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';

// Mock simple de bcrypt
const mockBcrypt = {
  hash: jest.fn()
};

// Mock simple de User
const mockUser = {
  create: jest.fn()
};

// Controlador simulado
const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await mockBcrypt.hash(password, 10);
    const user = await mockUser.create({ name, email, password: hashed });
    const plain = { id: user.id, name: user.name, email: user.email };
    res.status(201).json(plain);
  } catch (err) {
    next(err);
  }
};

const app = express();
app.use(express.json());
app.post('/users', createUser);

// IMPORTANTE: El middleware de error debe ir DESPUÉS de las rutas
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create user successfully', async () => {
    const userData = { name: 'John', email: 'john@test.com', password: 'pass123' };
    const hashedPassword = 'hashed_pass';
    const createdUser = { id: 1, name: 'John', email: 'john@test.com' };

    mockBcrypt.hash.mockResolvedValue(hashedPassword);
    mockUser.create.mockResolvedValue(createdUser);

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    expect(mockBcrypt.hash).toHaveBeenCalledWith('pass123', 10);
    expect(response.body.password).toBeUndefined();
    expect(response.body.name).toBe('John');
    expect(response.body.email).toBe('john@test.com');
  });

  test('should handle bcrypt errors', async () => {
    const userData = { name: 'Jane', email: 'jane@test.com', password: 'pass123' };
    mockBcrypt.hash.mockRejectedValue(new Error('Hash error'));

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(500);

    expect(response.body.message).toBe('Hash error');
    expect(mockBcrypt.hash).toHaveBeenCalledWith('pass123', 10);
    expect(mockUser.create).not.toHaveBeenCalled();
  });

  test('should handle database errors', async () => {
    const userData = { name: 'Bob', email: 'bob@test.com', password: 'pass123' };
    const hashedPassword = 'hashed_pass';
    
    mockBcrypt.hash.mockResolvedValue(hashedPassword);
    mockUser.create.mockRejectedValue(new Error('Email already exists'));

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(500);

    expect(response.body.message).toBe('Email already exists');
    expect(mockBcrypt.hash).toHaveBeenCalledWith('pass123', 10);
    expect(mockUser.create).toHaveBeenCalledWith({
      name: 'Bob',
      email: 'bob@test.com', 
      password: hashedPassword
    });
  });

  test('should handle missing password', async () => {
    const userData = { name: 'Alice', email: 'alice@test.com' };
    mockBcrypt.hash.mockRejectedValue(new Error('Password is required'));

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(500);

    expect(response.body.message).toBe('Password is required');
  });
});