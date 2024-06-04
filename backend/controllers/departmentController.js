const Department = require('../models/department');

exports.createDepartment = async (req, res) => {
    const { id, name, departmentDean } = req.body;

    try {
        const newDepartment = new Department({
            id,
            name,
            departmentDean
        });

        await newDepartment.save();
        res.status(201).json({ message: 'Department created successfully', department: newDepartment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};
