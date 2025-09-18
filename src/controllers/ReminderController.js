const ReminderModel = require("../models/ReminderModel");

// GET - Todos los recordatorios de un usuario
export const getAllReminders = async (req, res) => {
  try {
    const { userId } = req.params;
    const reminders = await ReminderModel.findAll({ where: { userId } });
    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const createReminder = async (req, res) => {
  try {
    const reminder = await ReminderModel.create(req.body);
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await ReminderModel.findByPk(id);
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });

    await reminder.update(req.body);
    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await ReminderModel.findByPk(id);
    if (!reminder) return res.status(404).json({ message: "Reminder not found" });

    await reminder.destroy();
    res.status(200).json({ message: "Reminder deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

