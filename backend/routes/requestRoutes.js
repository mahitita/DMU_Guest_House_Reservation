const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const verifyToken = require('../middlewares/authMiddleware'); // Adjust path as necessary
// POST request to create a new request
router.post('/create', requestController.createRequest);

// GET request for department dean to view all requests in their department
router.get('/dean', verifyToken, requestController.getRequestsForDean);

//router.put('/dean/approve/:id', verifyToken, requestController.updateRequestApproval);
// GET request for staff to view their own requests
router.get('/staff', verifyToken, requestController.getRequestsByStaff);

// PUT request to update a specific request
router.put('/:id', verifyToken, requestController.updateRequest);

// DELETE request to delete a specific request
router.delete('/:id', verifyToken, requestController.deleteRequest);

// PUT request for dean to approve a request
router.put('/dean/approve/:id', verifyToken, requestController.approveRequestByDean);

// GET request for general service to view all requests approved by the dean
router.get('/generalservice', verifyToken, requestController.getRequestsForGeneralService);

// PUT request for general service to approve a request
//router.put('/generalservice/approve/:id', verifyToken, requestController.approveRequestByGeneralService);
router.put('/:requestId/general-service-approval', requestController.updateGeneralServiceApproval);
module.exports = router;
