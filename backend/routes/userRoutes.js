const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure the path is correct

// Define the POST route for creating a new user
router.post('/', userController.createUser);

module.exports = router;
