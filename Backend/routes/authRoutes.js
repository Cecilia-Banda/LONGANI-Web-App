const express = require('express');
const Router = express.Router();

// Placeholder route
router.get('/', (req, res) => {
  res.send('Auth route working');
});

module.exports = Router;
