console.log('--- authRouterNew.js: File is being loaded! ---'); // Diagnostic log
import express from 'express';
import { register, login, getUserProfile, validateAuthData, getProfile} from '../controllers/authController.js';
import protect from '../middleware/authmiddleware.js'; 
import allowRoles  from '../middleware/CheckRole.js';


const router = express.Router();

router.post('/register', validateAuthData, register);
router.post('/login', validateAuthData, login);
router.get('/profile', protect, getProfile);



export default router;
