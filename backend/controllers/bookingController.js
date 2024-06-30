const Booking = require('../models/Booking');
const Room = require('../models/room');

// Controller function to create a new booking
exports.createBooking = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        roomType,
        numberOfGuests,
        arrivalDate,
        arrivalTime,
        departureDate,
        idImage
    } = req.body;

    try {
        // Create new booking instance
        const newBooking = new Booking({
            firstName,
            lastName,
            email,
            phoneNumber,
            roomType,
            numberOfGuests,
            arrivalDate,
            arrivalTime,
            departureDate,
            idImage
        });

        // Save the booking to the database
        await newBooking.save();

        // Update the room's reservation status
        await Room.findOneAndUpdate({ type: roomType, isReserved: false }, { isReserved: true });

        // Respond with success message
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (err) {
        console.error('Error creating booking:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to update room's reservation status
exports.updateRoomReservationStatus = async (req, res) => {
    const { roomNumber } = req.params; // Assuming roomNumber is part of the URL params

    try {
        // Find the room by roomNumber
        const room = await Room.findOne({ roomNumber });

        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }

        // Update the room's reservation status
        room.isReserved = true;
        await room.save();

        // Respond with success message
        res.json({ message: 'Room reservation status updated successfully', room });
    } catch (err) {
        console.error('Error updating room reservation status:', err);
        res.status(500).json({ error: 'Server error' });
    }
};
