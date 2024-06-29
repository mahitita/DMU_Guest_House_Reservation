const express = require('express');
const router = express.Router();
const saunaController = require('../controllers/saunaController');

// POST request to create a new sauna
router.post('/create', saunaController.createSauna);

module.exports = router;
