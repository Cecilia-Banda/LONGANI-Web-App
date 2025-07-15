console.log('--- authRouterNew.js: File is being loaded! ---'); // Diagnostic log

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authController.getUserProfile); // Optional

module.exports = router;
console.log('--- authRouterNew.js: Routes are set up! ---'); // Diagnostic log