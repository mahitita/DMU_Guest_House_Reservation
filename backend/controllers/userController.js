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

            // Check if a department dean already exists for the department
            if (role === 'department_dean') {
                const existingDean = await User.findOne({ department, role: 'department_dean' });
                if (existingDean) {
                    return res.status(400).json({ error: 'A department dean already exists for this department' });
                }
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

exports.viewUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const { name, email, phoneNumber, department, role } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.department = department || user.department;
        user.role = role || user.role;

        await user.save();

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
