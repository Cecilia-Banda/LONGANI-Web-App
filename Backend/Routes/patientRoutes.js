import express from 'express';
import {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
  searchPatients // ✅ ADD THIS LINE
} from '../controllers/patientController.js'; // Make sure searchPatients is exported from here

import protect from '../middleware/authmiddleware.js';
import allowRoles from '../middleware/CheckRole.js';
import restrictTo from '../middleware/restrictTo.js'; 

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/search', allowRoles('Doctor', 'Nurse', 'Record_Officer', 'Admin'), searchPatients);

// 🔧 Filing Department: Create/Delete
router.post('/', allowRoles('Record_Officer'), createPatient);
router.delete('/:id', allowRoles('Record_Officer'), deletePatient);
router.get('/', allowRoles('Doctor', 'Nurse', 'Record_Officer', 'Admin'), getAllPatients);
router.get('/:id', allowRoles('Doctor', 'Nurse', 'Record_Officer'), getSinglePatient);
router.put('/:id', allowRoles('Doctor', 'Nurse', 'Record_Officer'), updatePatient);

export default router;
