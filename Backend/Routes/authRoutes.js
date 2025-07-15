console.log('--- authRouterNew.js: File is being loaded! ---'); // Diagnostic log
import express from 'express';
import { register, login, getUserProfile } from '../controllers/authController.js';
import protect from '../middleware/authmiddleware.js'; // ⬅️ use import

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// 🔐 Protected route — requires valid token in headers
router.get('/profile', protect, getUserProfile);

export default router;
// ✅ Use ESModule export syntax