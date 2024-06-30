const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    departureDate: {
        type: Date,
        required: true
    },
    idImage: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;