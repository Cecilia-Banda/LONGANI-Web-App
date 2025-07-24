console.log('--- authRouterNew.js: File is being loaded! ---'); // Diagnostic log
import express from 'express';
import { register, login, getUserProfile } from '../controllers/authController.js';
import protect from '../middleware/authmiddleware.js'; 
import allowRoles  from '../middleware/CheckRole.js';


const router = express.Router();

router.post('/login', (req, res, next) => {
    console.log('Login route hit'); // Debugging log
    next();
}, login);

router.post('/register', register);

router.get('/profile', protect, getUserProfile); 



export default router;
// ✅ Use ESModule export syntax