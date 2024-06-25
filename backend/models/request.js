const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    staff: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true }
    },
    department: {
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
        name: { type: String, required: true }
    },
    type: {
        type: String,
        enum: ['apparent', 'procurement', 'education', 'research', 'other'],
        required: true
    },
    details: { type: String },
    document: { type: String }, // Assuming the document is stored as a URL or file path
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    deanApproved: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    generalServiceApproved: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Request', RequestSchema);
