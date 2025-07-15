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

const router = express.Router();

router.use(protect); // All routes require auth

// 🔧 Filing Department: Create/Delete
router.post('/', allowRoles('Record Officer'), createPatient);
router.delete('/:id', allowRoles('Record Officer'), deletePatient);

// 📖 View Access
router.get('/', allowRoles('Doctor', 'Nurse', 'Record Officer', 'Admin'), getAllPatients);
router.get('/:id', allowRoles('Doctor', 'Nurse', 'Record Officer'), getSinglePatient);
// 📝 Update medical info
router.put('/:id', allowRoles('Doctor', 'Nurse', 'Record Officer'), updatePatient);

export default router;
