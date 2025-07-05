// Backend/routes/authRouterNew.js
// This is a new file to bypass potential caching issues with the old authRoutes.js

console.log('--- authRouterNew.js: File is being loaded! ---'); // Diagnostic log

import express from 'express';
// Ensure 'router' is lowercase. If 'express.Router()' itself was the issue,
// which is highly unlikely, this would still fail.
const router = express.Router();

console.log('--- authRouterNew.js: Express Router initialized! ---'); // Diagnostic log
console.log('--- authRouterNew.js: Type of router:', typeof router); // Check type

// Placeholder route
router.get('/', (req, res) => {
    console.log('--- Auth route hit via authRouterNew! ---'); // Diagnostic log
    res.send('Auth route working from new file');
});

console.log('--- authRouterNew.js: Exporting router! ---', router); // Diagnostic log
export default router; // Ensure 'export default' is used
