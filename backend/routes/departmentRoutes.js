const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Define the POST route for creating a new department
router.post('/', departmentController.createDepartment);

module.exports = router;
