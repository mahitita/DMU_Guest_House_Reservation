const express = require('express');
const router = express.Router();
const userController = require('../controllers/hrController');
const authenticateSuperAdmin = require('../middlewares/superAdminAuth');

// Route to create an HR user
router.post('/create-hr', authenticateSuperAdmin, userController.createHRUser);

module.exports = router;
