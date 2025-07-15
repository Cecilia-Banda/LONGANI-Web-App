console.log('--- authRouterNew.js: File is being loaded! ---'); // Diagnostic log
import express from 'express';
import { register, login, getUserProfile } from '../controllers/authController.js';
import protect from '../middleware/authmiddleware.js'; 
import allowRoles  from '../middleware/CheckRole.js';
import { createPatient } from '../controllers/patientController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.post('/', allowRoles('admin', 'Record Officer'), createPatient);

router.get('/profile', protect, getUserProfile);

export default router;
// ✅ Use ESModule export syntax