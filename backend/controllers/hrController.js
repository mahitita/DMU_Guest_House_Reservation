const User = require('../models/user');
const bcrypt = require('bcrypt');
const Department = require('../models/department');

exports.createHRUser = async (req, res) => {
    const { hrUserDetails, departmentId } = req.body;
    const { name, email, password, phoneNumber, id } = hrUserDetails;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Find the department by its id
        const department = await Department.findOne({ id: departmentId });
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new HR user
        const hrUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            id,
            role: 'hr',
            department: department.id // Associate the HR user with the department by its id
        });

        // Save the user to the database
        await hrUser.save();
        res.status(201).json({ message: 'HR user created successfully', user: hrUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
