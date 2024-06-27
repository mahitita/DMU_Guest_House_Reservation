const mongoose = require('mongoose');
const Request = require('../models/request');

// Controller function to create a new request with file upload
exports.createRequest = async (req, res) => {
    try {
        // Extract data from the json field in the form-data
        const { staffId, staffName, departmentId, departmentName, type, details } = JSON.parse(req.body.json);

        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'Please upload a document' });
        }

        // File URL or path
        const document = req.file.filename; // Assuming 'filename' is where multer stores uploaded files

        // Create new request instance
        const newRequest = new Request({
            staff: {
                id: staffId,
                name: staffName
            },
            department: {
                id: departmentId,
                name: departmentName
            },
            type,
            details,
            document
        });

        // Save the request to the database
        await newRequest.save();

        // Respond with success message
        res.status(201).json({ message: 'Request created successfully', request: newRequest });
    } catch (err) {
        // Handle any errors
        console.error('Error creating request:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
