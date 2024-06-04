const User = require('../models/user');
const Department = require('../models/department');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res) => {
    const { name, email, password, phoneNumber, id, department, role } = req.body;

    try {
        // Ensure the department exists if the role is not 'customer'
        if (role !== 'customer') {
            const foundDepartment = await Department.findOne({ id: department });
            if (!foundDepartment) {
                return res.status(400).json({ error: 'Department not found' });
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            id,
            department: role === 'customer' ? null : department,
            role,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
