const Reservation = require('../models/reservation');
const Ticket = require('../models/ticket');
const Room = require('../models/room');
const { validationResult } = require('express-validator');

// Controller function to make a reservation using a ticket
exports.makeReservation = async (req, res) => {
    try {
        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { ticketId, roomId, sauna, swimming, foodOrder, startDate, endDate } = req.body;

        // Check if the ticket is valid
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            console.error(`Ticket with ID ${ticketId} not found`);
            return res.status(400).json({ error: 'Invalid or expired ticket' });
        }

        if (ticket.status !== 'Approved') {
            console.error(`Ticket with ID ${ticketId} is not approved`);
            return res.status(400).json({ error: 'Invalid or expired ticket' });
        }

        if (ticket.expiry_date < Date.now()) {
            console.error(`Ticket with ID ${ticketId} has expired`);
            return res.status(400).json({ error: 'Invalid or expired ticket' });
        }

        // Check if the room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Update the room's isReserved status to true
        room.isReserved = true;
        await room.save();

        // Update the ticket's status to used
        ticket.status = 'Used';
        await ticket.save();

        // Create new reservation instance
        const newReservation = new Reservation({
            ticket: ticketId,
            room: roomId,
            sauna,
            swimming,
            foodOrder,
            startDate,
            endDate
        });

        // Save the reservation to the database
        await newReservation.save();

        // Respond with success message
        res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation });
    } catch (err) {
        // Handle any errors
        console.error('Error making reservation:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = exports;
