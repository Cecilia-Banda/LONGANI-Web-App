import express from 'express';
import {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient
} from '../controllers/patientController.js';

import protect from '../middleware/authmiddleware.js';
import allowRoles from '../middleware/CheckRole.js';
import restrictTo from '../middleware/restrictTo.js'; 

// Create a new router instance

const router = express.Router();

router.use(protect); // All routes require auth

// 🔧 Filing Department: Create/Delete
router.post('/', allowRoles, restrictTo('Record Officer'), createPatient);
router.delete('/:id', allowRoles, restrictTo('Record Officer'), deletePatient);
router.get('/', allowRoles('Doctor', 'Nurse', 'Record Officer', 'Admin'), getAllPatients);
router.get('/:id', allowRoles('Doctor', 'Nurse', 'Record Officer'), getSinglePatient);
router.put('/:id', allowRoles('Doctor', 'Nurse', 'Record Officer'), updatePatient);

export default router;
