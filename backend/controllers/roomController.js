const Room = require('../models/room');

exports.createRoom = async (req, res) => {
    const { roomNumber, type, price, picture } = req.body;

    try {
        const newRoom = new Room({
            roomNumber,
            type,
            price,
            picture
        });

        await newRoom.save();
        res.status(201).json({ message: 'Room created successfully', room: newRoom });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateRoom = async (req, res) => {
    const { id } = req.params;
    const { roomNumber, type, price, isReserved, picture } = req.body;

    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            id,
            { roomNumber, type, price, isReserved, picture },
            { new: true, runValidators: true }
        );

        if (!updatedRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }

        res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRoom = await Room.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
