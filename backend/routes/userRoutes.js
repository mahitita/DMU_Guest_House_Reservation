const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Ensure the path is correct

// Define the POST route for creating a new user
router.post('/', userController.createUser);

// Define the GET route for viewing all users
router.get('/', userController.viewUsers);

// Define the PUT route for updating a user
router.put('/:userId', userController.updateUser);

// Define the DELETE route for deleting a user
router.delete('/:userId', userController.deleteUser);

module.exports = router;
