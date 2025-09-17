import express from "express";
import {
  getAllReminders,
  getOneReminder,
  createReminder,
  updateReminder,
  deleteReminder,
} from   "../controllers/ReminderController.js";

const router = express.Router();

// Obtener todos los recordatorios de un usuario
// Ejemplo: GET /reminders/user/1
router.get("/user/:userId", getAllReminders);

// Obtener un recordatorio específico por ID
router.get("/:id", getOneReminder);

// Crear un nuevo recordatorio
router.post("/", createReminder);

// Actualizar un recordatorio por ID
router.put("/:id", updateReminder);

// Borrar un recordatorio por ID
router.delete("/:id", deleteReminder);

