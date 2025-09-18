import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { createUser, login } from '../controllers/Usercontroller.js'; // Agregamos .js y login

const router = Router();

const userValidation = [
  body('name').trim().notEmpty().withMessage('name required'),
  body('email').isEmail().withMessage('invalid email'),
  body('password').isLength({ min: 6 }).withMessage('password min 6 chars')
];

const loginValidation = [
  body('email').isEmail().withMessage('invalid email'),
  body('password').notEmpty().withMessage('password required')
];

// Ruta para registrar usuario
router.post('/register', userValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return createUser(req, res, next);
});

// Ruta para login
router.post('/login', loginValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return login(req, res, next);
});

export default router;