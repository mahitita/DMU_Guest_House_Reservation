const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const verifyToken = require('../middlewares/authMiddleware'); // Assuming you have a middleware for authentication

// Route to create a new room
router.post('/', verifyToken, roomController.createRoom);

// Route to get all rooms
router.get('/', verifyToken, roomController.getRooms);

// Route to get a specific room by ID
router.get('/:id', verifyToken, roomController.getRoom);

// Route to update a specific room by ID
router.put('/:id', verifyToken, roomController.updateRoom);

// Route to delete a specific room by ID
router.delete('/:id', verifyToken, roomController.deleteRoom);

module.exports = router;
