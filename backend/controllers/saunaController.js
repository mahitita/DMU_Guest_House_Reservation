const Sauna = require('../models/sauna');

// Controller function to create a new sauna
exports.createSauna = async (req, res) => {
    try {
        const { name, description, capacity, location, pricePerHour, image } = req.body;

        // Check if sauna with the same name already exists
        const existingSauna = await Sauna.findOne({ name });
        if (existingSauna) {
            return res.status(400).json({ error: 'Sauna with this name already exists' });
        }

        // Create new sauna instance
        const newSauna = new Sauna({
            name,
            description,
            capacity,
            location,
            pricePerHour,
            image
        });

        // Save the sauna to the database
        await newSauna.save();

        res.status(201).json({ message: 'Sauna created successfully', sauna: newSauna });
    } catch (err) {
        console.error('Error creating sauna:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = exports;
