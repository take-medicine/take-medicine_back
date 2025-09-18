import express from "express";
import { body, param, validationResult } from "express-validator"; // ← AGREGAR ESTA LÍNEA
import {
  getAllReminders,
  getOneReminder,
  createReminder,
  updateReminder,
  deleteReminder,
} from "../controllers/ReminderController.js";

const router = express.Router();
// listar por userId (en ruta)
router.get('/user/:userId', [
  param('userId').isInt().withMessage('userId must be an integer')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return getAllReminders(req, res, next);
});

router.get('/:id', [
  param('id').isInt().withMessage('id must be an integer')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return getOneReminder(req, res, next);
});

router.post('/', [
  body('medicationName').notEmpty(),
  body('time').notEmpty(),
  body('userId').isInt()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return createReminder(req, res, next);
});

router.put('/:id', [
  param('id').isInt(),
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return updateReminder(req, res, next);
});

router.delete('/:id', [
  param('id').isInt()
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return deleteReminder(req, res, next);
});

export default router;