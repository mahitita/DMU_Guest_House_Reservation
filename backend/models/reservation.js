const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',  // Reference to the Ticket model
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',   // Reference to the Room model
        required: true
    },
    sauna: {
        type: Boolean,
        default: false  // Reference to the Sauna model
    },
    swimming: {
        type: Boolean,
        default: false
    },
    foodOrder: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reservationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Reserved', 'Cancelled'],
        default: 'Reserved'
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);
