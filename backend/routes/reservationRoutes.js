const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { validateReservation } = require('../middlewares/reservationValidationMiddleware');

// Create a new reservation
router.post('/reservations', reservationController.makeReservation);

// Other routes for reservations

module.exports = router;
