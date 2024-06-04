const express = require("express");
const Ticket = require("../models/ticket");
const mongoose = require('mongoose');

const router = express.Router();

// Route to create a ticket
router.post("/", async (req, res) => {
    const { staff_id, expiry_date, purpose } = req.body;

    const ticket = new Ticket({
        ticket_id: new mongoose.Types.ObjectId().toString(), // Generate a unique ID for ticket_id
        staff_id,
        expiry_date,
        purpose
    });

    try {
        const savedTicket = await ticket.save();
        res.status(201).json(savedTicket);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
