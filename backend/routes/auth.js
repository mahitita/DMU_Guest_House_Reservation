const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the POST route for logging in a HR user
router.post('/login', authController.loginUser);

module.exports = router;
