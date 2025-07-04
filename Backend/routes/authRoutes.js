// Backend/routes/authRoutes.js
// IMPORTANT: Ensure this file is named 'authRoutes.js' (lowercase .js)
// And that the 'router' variable is declared with a lowercase 'r'

const express = require('express');
const router = express.router(); // <--- THIS LINE IS CRUCIAL: 'router' must be lowercase

// Placeholder route
router.get('/', (req, res) => {
    res.send('Auth route working');
});

module.exports = router;
