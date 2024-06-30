const mongoose = require('mongoose');

const SaunaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    capacity: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    image: {
        type: String  // Assuming you store image URLs or paths
    }
});

module.exports = mongoose.model('Sauna', SaunaSchema);
