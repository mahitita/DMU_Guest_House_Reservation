const Booking = require('../models/Booking');
const fs = require('fs');
const path = require('path');

const createBooking = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, roomType, numberOfGuests, arrivalDateTime, departureDate, idImage } = req.body;

    // Decode base64 image
    const imageData = idImage.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(imageData, 'base64');
    const imagePath = `./uploads/${Date.now()}.png`; // Save as PNG file

    fs.writeFileSync(imagePath, buffer);

    const newBooking = new Booking({
      firstName,
      lastName,
      email,
      phoneNumber,
      roomType,
      numberOfGuests,
      arrivalDateTime,
      departureDate,
      idImage: imagePath
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

module.exports = {
  createBooking,
};
