const { body, validationResult } = require('express-validator');

// Validation middleware for creating reservations
exports.validateReservation = [
    body('ticketId').isMongoId().withMessage('Invalid Ticket ID'),
    body('roomId').isMongoId().withMessage('Invalid Room ID'),
    body('startDate').isISO8601().toDate().withMessage('Invalid start date'),
    body('endDate').isISO8601().toDate().withMessage('Invalid end date'),
    // Additional validation for other fields like sauna, swimming, foodOrder
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
