const mongoose = require('mongoose');
const Request = require('../models/request');
const Ticket = require('../models/ticket');
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
        res.status500.json({ error: 'Server error' });
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

// Controller function for the general service to approve a request and generate a ticket

const { v4: uuidv4 } = require('uuid'); // For generating unique ticket IDs

// Update generalServiceApproved and status, and create a ticket if approved
exports.updateGeneralServiceApproval = async (req, res) => {
    const { requestId } = req.params;
    const { approvalStatus } = req.body;

    if (!['approved', 'rejected'].includes(approvalStatus)) {
        return res.status(400).json({ message: 'Invalid approval status' });
    }

    try {
        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        if (request.deanApproved !== 'approved') {
            return res.status(400).json({ message: 'Request must be approved by the dean first' });
        }

        request.generalServiceApproved = approvalStatus;

        // Update status based on generalServiceApproved value
        request.status = approvalStatus;

        await request.save();

        // If approved, create a ticket for the staff
        if (approvalStatus === 'approved') {
            const ticket = new Ticket({
                ticket_id: uuidv4(), // Generate a unique ticket ID
                staff: request.staff.id,
                expiry_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Set expiry date to 30 days from now
                status: 'Approved',
                purpose: `Request approved for type: ${request.type}`
            });

            await ticket.save();
        }

        res.status(200).json({ message: 'Request updated successfully', request });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Helper function to generate a unique ticket ID (example function, implement your own logic)
function generateTicketId() {
    return `TKT-${Date.now()}`;
}
