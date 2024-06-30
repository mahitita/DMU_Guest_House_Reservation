const Ticket = require('../models/ticket');

// Controller function to get all tickets for a specific staff member
exports.getTicketsByStaff = async (req, res) => {
    try {
        const staffId = req.user.id; // Assuming user is authenticated and user data is in req.user

        // Find all tickets for the staff member
        const tickets = await Ticket.find({ staff: staffId });

        // Respond with the tickets
        res.status(200).json({ tickets });
    } catch (err) {
        // Handle any errors
        console.error('Error fetching tickets:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to update a specific ticket status (e.g., mark as used)
exports.updateTicketStatus = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const { status } = req.body; // Get the updated status from the request body

        // Find the ticket by ID
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        // Update the ticket status
        ticket.status = status;

        // Save the updated ticket
        await ticket.save();

        // Respond with the updated ticket
        res.status(200).json({ message: 'Ticket status updated successfully', ticket });
    } catch (err) {
        // Handle any errors
        console.error('Error updating ticket:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
