const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch the user from the database
        const user = await User.findById(decoded.id).populate('departmentDetails');

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Set the user in the request object
        req.user = {
            id: user._id,
            email: user.email,
            department: user.department, // Assuming department is a String ID
            role: user.role,
            departmentDetails: user.departmentDetails
        };

        next(); // Pass control to the next middleware function
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = verifyToken;
