const mongoose = require('mongoose');
const Request = require('../models/request');
const User = require('../models/user');
const Department = require('../models/department');

// Create a new request
exports.createRequest = async (req, res) => {
    try {
        const { staffId, staffName, departmentId, departmentName, type, details } = req.body;

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
            details
        });

        // Save the request to the database
        await newRequest.save();

        // Respond with success message
        res.status(201).json({ message: 'Request created successfully', request: newRequest });
    } catch (err) {
        console.error('Error creating request:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all requests for a department dean
exports.getRequestsForDean = async (req, res) => {
    try {
        const departmentId = req.user.department; // Assuming the department ID is stored in req.user

        // Find all requests for the department
        const requests = await Request.find({ 'department.id': departmentId });

        // Respond with the requests
        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching requests for dean:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update request approval
exports.updateRequestApproval = async (req, res) => {
    try {
        const requestId = req.params.id;
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { isDeanApproved: 'approved' },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ error: 'Request not found' });
        }

        res.status(200).json({ request: updatedRequest });
    } catch (err) {
        console.error('Error updating request approval:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
// Get requests by staff
exports.getRequestsByStaff = async (req, res) => {
    try {
        const staffId = req.user.id; // Assuming user is authenticated and user data is in req.user

        // Find all requests by the staff member
        const requests = await Request.find({ 'staff.id': staffId });

        // Respond with the requests
        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching requests by staff:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a specific request
exports.updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find the request by ID and update it
        const updatedRequest = await Request.findByIdAndUpdate(id, updateData, { new: true });

        // If the request is not found
        if (!updatedRequest) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Respond with the updated request
        res.status(200).json({ message: 'Request updated successfully', request: updatedRequest });
    } catch (err) {
        console.error('Error updating request:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a specific request
exports.deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the request by ID and delete it
        const deletedRequest = await Request.findByIdAndDelete(id);

        // If the request is not found
        if (!deletedRequest) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Respond with success message
        res.status(200).json({ message: 'Request deleted successfully' });
    } catch (err) {
        console.error('Error deleting request:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Approve a request by dean
exports.approveRequestByDean = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the request by ID and update its status
        const updatedRequest = await Request.findByIdAndUpdate(id, { deanApproved: 'approved' }, { new: true });

        // If the request is not found
        if (!updatedRequest) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Respond with the updated request
        res.status(200).json({ message: 'Request approved by dean', request: updatedRequest });
    } catch (err) {
        console.error('Error approving request by dean:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all requests approved by the dean for general service
exports.getRequestsForGeneralService = async (req, res) => {
    try {
        // Find all requests approved by the dean
        const requests = await Request.find({ deanApproved: 'approved' });

        // Respond with the requests
        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching requests for general service:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Approve a request by general service
exports.approveRequestByGeneralService = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the request by ID and update its status
        const updatedRequest = await Request.findByIdAndUpdate(id, { generalServiceApproved: 'approved' }, { new: true });

        // If the request is not found
        if (!updatedRequest) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Respond with the updated request
        res.status(200).json({ message: 'Request approved by general service', request: updatedRequest });
    } catch (err) {
        console.error('Error approving request by general service:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
