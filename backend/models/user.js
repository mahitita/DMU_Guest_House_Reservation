const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: true,
        default: () => Math.random().toString(36).slice(-8)
    }, // Default password generation 
    phoneNumber: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    department: {
        type: String,
        ref: 'Department',
        required: function () {
            return this.role !== 'customer';
        }
    },
    role: {
        type: String,
        enum: ['customer', 'staff', 'department_dean', 'general_service_directorate', 'guesthouse_manager', 'hr', 'system_admin'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Hash password before saving
/*UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
*/
// Virtual to populate department
UserSchema.virtual('departmentDetails', {
    ref: 'Department',
    localField: 'department',
    foreignField: 'id',
    justOne: true
});

module.exports = mongoose.model('User', UserSchema);
