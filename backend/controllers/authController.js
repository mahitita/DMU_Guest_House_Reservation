const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    const { identifier, password } = req.body; // Identifier can be email or phone number

    try {
        // Find the user by email or phone number
        const user = await User.findOne({
            $or: [{ email: identifier }, { phoneNumber: identifier }]
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Define the sidebar list based on the user role
        let sidebarList = [];
        switch (user.role) {
            case 'staff':
                sidebarList = ["create request", "view requests", "view tickets", "book room", "view reservation", "profile", "log out"];
                break;
            case 'department_dean':
                sidebarList = ["view requests", "view approved requests", "profile", "log out"];
                break;
            case 'general service':
                sidebarList = ["view requests", "view tickets", "profile", "log out"];
                break;
            case 'manager':
                sidebarList = ["add room", "view rooms", "view reservation"];
                break;
            case 'customer':
                sidebarList = ["book room", "view bookings"];
                break;
            case 'hr':
                sidebarList = ["register user", "view users", "update user information", "profile", "log out"];
                break;
            default:
                sidebarList = [];
        }

        res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role,
            sidebarList
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
