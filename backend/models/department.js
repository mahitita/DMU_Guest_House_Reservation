const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    departmentDean: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional field
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updatedAt field before each save
DepartmentSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Department', DepartmentSchema);
