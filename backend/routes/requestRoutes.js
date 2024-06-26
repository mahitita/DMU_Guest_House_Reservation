const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');

router.post('/create', requestController.upload.single('document'), requestController.createRequest);

module.exports = router;
