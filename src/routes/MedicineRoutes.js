// src/routes/MedicineRoutes.js
import { Router } from 'express';
import {
  getAllMedicines,
  createMedicine,
 
} from '../controllers/MedicineController.js';

const router = Router();

// Routes for CRUD operations
router.get('/', getAllMedicines);
router.post('/', createMedicine);
;

export default router;