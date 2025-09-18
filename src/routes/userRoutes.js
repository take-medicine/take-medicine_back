// src/routes/userRoutes.js
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { createUser } from './controllers/UserController.js';

const router = Router();

const userValidation = [
  body('name').trim().notEmpty().withMessage('name required'),
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 6 }).withMessage('password min 6 chars')
];

router.post('/', userValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  return createUser(req, res, next);
});

export default router;
