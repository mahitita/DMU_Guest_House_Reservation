const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const verifyToken = require('../middlewares/authMiddleware');

// Get all tickets for a specific staff member
router.get('/tickets', verifyToken, ticketController.getTicketsByStaff);

// Update ticket status (e.g., mark as used)
router.put('/tickets/:id', verifyToken, ticketController.updateTicketStatus);

module.exports = router;
