import ReminderModel from "../models/ReminderModel.js";

// GET - Todos los recordatorios de un usuario
export const getAllReminders = async (req, res) => {
  try {
    const { userId } = req.params; // Se puede pasar userId en la ruta o por token
    const reminders = await ReminderModel.findAll({ where: { userId } });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET - Un recordatorio por ID
export const getOneReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await ReminderModel.findByPk(id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST - Crear recordatorio
export const createReminder = async (req, res) => {
  try {
    const reminder = await ReminderModel.create({
      medicationName: req.body.medicationName,
      description: req.body.description,
      duration: req.body.duration,
      time: req.body.time,
      days: req.body.days,
      dosage: req.body.dosage,
      userId: req.body.userId, // o desde token si usas autenticación
    });
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT - Actualizar recordatorio
export const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await ReminderModel.findByPk(id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    await reminder.update(req.body);
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE - Borrar recordatorio
export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await ReminderModel.findByPk(id);
    if (!reminder) {
      return res.status(404).json({ message: "Reminder not found" });
    }
    await reminder.destroy();
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
