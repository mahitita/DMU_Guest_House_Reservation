const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticket_id: {
        type: String,
        required: true,
        unique: true
    },
    staff: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    issued_date: {
        type: Date,
        default: Date.now
    },
    expiry_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Used', 'Expired'],
        default: 'Pending'
    },
    purpose: {
        type: String
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);
