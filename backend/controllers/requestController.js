const mongoose = require('mongoose');
const Request = require('../models/request');
const User = require('../models/user');
const Department = require('../models/department');

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

        // Find the staff by custom ID
        const staff = await User.findOne({ id: staffId });
        if (!staff) {
            return res.status(404).json({ error: 'Staff not found' });
        }

        // Find the department by custom ID
        const department = await Department.findOne({ id: departmentId });
        if (!department) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Create new request instance
        const newRequest = new Request({
            staff: {
                id: staff._id,
                name: staffName
            },
            department: {
                id: department._id,
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

// Controller function to get all requests for a department dean
exports.getRequestsForDean = async (req, res) => {
    try {
        const deanId = req.user.id; // Assuming user is authenticated and user data is in req.user

        // Find the dean's department
        const dean = await User.findById(deanId).populate('departmentDetails');
        if (!dean) {
            return res.status(404).json({ error: 'Dean not found' });
        }

        // Find all requests for the dean's department
        const requests = await Request.find({ 'department.id': dean.departmentDetails._id });

        // Respond with the requests
        res.status(200).json({ requests });
    } catch (err) {
        // Handle any errors
        console.error('Error fetching requests:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to get all requests created by a specific staff member
exports.getRequestsByStaff = async (req, res) => {
    try {
        const staffId = req.user.id; // Assuming user is authenticated and user data is in req.user

        // Find all requests created by the staff member
        const requests = await Request.find({ 'staff.id': staffId });

        // Respond with the requests
        res.status(200).json({ requests });
    } catch (err) {
        // Handle any errors
        console.error('Error fetching requests:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to update a specific request
exports.updateRequest = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { type, details } = req.body; // Get updated fields from the request body

        // Find the request by ID
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Update request fields
        if (type) request.type = type;
        if (details) request.details = details;

        // Save the updated request
        await request.save();

        // Respond with the updated request
        res.status(200).json({ message: 'Request updated successfully', request });
    } catch (err) {
        // Handle any errors
        console.error('Error updating request:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to delete a specific request
exports.deleteRequest = async (req, res) => {
    try {
        const requestId = req.params.id;

        // Find the request by ID and delete it
        const deletedRequest = await Request.findByIdAndDelete(requestId);
        if (!deletedRequest) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Request deleted successfully', request: deletedRequest });
    } catch (err) {
        // Handle any errors
        console.error('Error deleting request:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function for the dean to approve a request
exports.approveRequestByDean = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { deanApproved } = req.body; // Get the deanApproved status from the request body

        // Find the request by ID
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Update the request status to approved or rejected by the dean
        request.deanApproved = deanApproved || 'approved';
        if (deanApproved === 'approved') {
            request.status = 'pending';
        } else if (deanApproved === 'rejected') {
            request.status = 'rejected';
        }

        // Save the updated request
        await request.save();

        // Respond with the updated request
        res.status(200).json({ message: 'Request status updated successfully', request });
    } catch (err) {
        // Handle any errors
        console.error('Error approving request:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to get all requests approved by the dean for the general service
exports.getRequestsForGeneralService = async (req, res) => {
    try {
        // Find all requests that are approved by the dean and not yet approved/rejected by the general service
        const requests = await Request.find({
            deanApproved: 'approved',
            generalServiceApproved: 'pending'
        });

        // Respond with the requests
        res.status(200).json({ requests });
    } catch (err) {
        // Handle any errors
        console.error('Error fetching requests:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function for the general service to approve a request
exports.approveRequestByGeneralService = async (req, res) => {
    try {
        const requestId = req.params.id;
        const { generalServiceApproved } = req.body; // Get the generalServiceApproved status from the request body

        // Find the request by ID
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Check if the request has been approved by the dean
        if (request.deanApproved !== 'approved') {
            return res.status(403).json({ error: 'Unauthorized: Only requests approved by the dean can be processed' });
        }

        // Update the request status to approved or rejected by the general service
        request.generalServiceApproved = generalServiceApproved || 'approved';
        if (generalServiceApproved === 'approved') {
            request.status = 'approved';
        } else if (generalServiceApproved === 'rejected') {
            request.status = 'rejected';
        }

        // Save the updated request
        await request.save();

        // Respond with the updated request
        res.status(200).json({ message: 'Request status updated successfully', request });
    } catch (err) {
        // Handle any errors
        console.error('Error approving request:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = exports;
