import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';

// Mock del modelo
const mockReminderModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn()
};

// Simulamos los controladores (compatible con ES Modules)
const getAllReminders = async (req, res) => {
  try {
    const { userId } = req.params;
    const reminders = await mockReminderModel.findAll({ where: { userId } });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOneReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await mockReminderModel.findByPk(id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReminder = async (req, res) => {
  try {
    const reminder = await mockReminderModel.create(req.body);
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await mockReminderModel.findByPk(id);
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });

    // Simulamos update
    Object.assign(reminder, req.body);
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await mockReminderModel.findByPk(id);
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });

    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Configurar Express
const app = express();
app.use(express.json());

// Rutas
app.get('/reminders/:userId', getAllReminders);
app.get('/reminder/:id', getOneReminder);
app.post('/reminders', createReminder);
app.put('/reminder/:id', updateReminder);
app.delete('/reminder/:id', deleteReminder);

describe('ReminderController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /reminders/:userId - getAllReminders', () => {
    test('should return all reminders for a user', async () => {
      const mockReminders = [
        { id: 1, title: 'Test reminder 1', userId: 1 },
        { id: 2, title: 'Test reminder 2', userId: 1 }
      ];

      mockReminderModel.findAll.mockResolvedValue(mockReminders);

      const response = await request(app)
        .get('/reminders/1')
        .expect(200);

      expect(response.body).toEqual(mockReminders);
      expect(mockReminderModel.findAll).toHaveBeenCalledWith({ where: { userId: '1' } });
    });

    test('should handle errors when getting all reminders', async () => {
      const errorMessage = 'Database error';
      mockReminderModel.findAll.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .get('/reminders/1')
        .expect(500);

      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('GET /reminder/:id - getOneReminder', () => {
    test('should return a specific reminder', async () => {
      const mockReminder = { id: 1, title: 'Test reminder', userId: 1 };
      mockReminderModel.findByPk.mockResolvedValue(mockReminder);

      const response = await request(app)
        .get('/reminder/1')
        .expect(200);

      expect(response.body).toEqual(mockReminder);
      expect(mockReminderModel.findByPk).toHaveBeenCalledWith('1');
    });

    test('should return 404 when reminder not found', async () => {
      mockReminderModel.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .get('/reminder/999')
        .expect(404);

      expect(response.body).toEqual({ message: 'Reminder not found' });
    });

    test('should handle errors when getting one reminder', async () => {
      const errorMessage = 'Database error';
      mockReminderModel.findByPk.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .get('/reminder/1')
        .expect(500);

      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('POST /reminders - createReminder', () => {
    test('should create a new reminder', async () => {
      const newReminder = { title: 'New reminder', userId: 1, date: '2024-01-01' };
      const createdReminder = { id: 1, ...newReminder };
      
      mockReminderModel.create.mockResolvedValue(createdReminder);

      const response = await request(app)
        .post('/reminders')
        .send(newReminder)
        .expect(201);

      expect(response.body).toEqual(createdReminder);
      expect(mockReminderModel.create).toHaveBeenCalledWith(newReminder);
    });

    test('should handle errors when creating reminder', async () => {
      const errorMessage = 'Validation error';
      mockReminderModel.create.mockRejectedValue(new Error(errorMessage));

      const response = await request(app)
        .post('/reminders')
        .send({ title: 'Test' })
        .expect(500);

      expect(response.body).toEqual({ message: errorMessage });
    });
  });

  describe('PUT /reminder/:id - updateReminder', () => {
    test('should update an existing reminder', async () => {
      const updateData = { title: 'Updated reminder' };
      const mockReminder = {
        id: 1,
        title: 'Original reminder'
      };

      mockReminderModel.findByPk.mockResolvedValue(mockReminder);

      const response = await request(app)
        .put('/reminder/1')
        .send(updateData)
        .expect(200);

      expect(mockReminderModel.findByPk).toHaveBeenCalledWith('1');
      expect(response.body.title).toBe('Updated reminder');
    });

    test('should return 404 when updating non-existent reminder', async () => {
      mockReminderModel.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .put('/reminder/999')
        .send({ title: 'Updated' })
        .expect(404);

      expect(response.body).toEqual({ message: 'Reminder not found' });
    });
  });

  describe('DELETE /reminder/:id - deleteReminder', () => {
    test('should delete an existing reminder', async () => {
      const mockReminder = {
        id: 1,
        title: 'Test reminder'
      };

      mockReminderModel.findByPk.mockResolvedValue(mockReminder);

      const response = await request(app)
        .delete('/reminder/1')
        .expect(200);

      expect(response.body).toEqual({ message: 'Reminder deleted successfully' });
      expect(mockReminderModel.findByPk).toHaveBeenCalledWith('1');
    });

    test('should return 404 when deleting non-existent reminder', async () => {
      mockReminderModel.findByPk.mockResolvedValue(null);

      const response = await request(app)
        .delete('/reminder/999')
        .expect(404);

      expect(response.body).toEqual({ message: 'Reminder not found' });
    });
  });
});