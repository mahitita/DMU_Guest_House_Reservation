const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    ticket_id: {
        type: String,
        required: true,
        unique: true
    },
    staff_id: {
        type: String,
        ref: 'Staff',
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
        enum: ['Pending', 'Approved', 'Used'],
        default: 'Pending'
    },
    purpose: {
        type: String
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);
