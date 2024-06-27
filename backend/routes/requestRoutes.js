const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const upload = require('../middlewares/multerConfig'); // Adjust path as necessary

// POST request to create a new request with file upload
router.post('/', upload.single('document'), requestController.createRequest);

module.exports = router;
