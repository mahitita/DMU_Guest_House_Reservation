const Request = require('../models/request');
const Department = require('../models/department');
const multer = require('multer');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

exports.createRequest = async (req, res) => {
    const { staff, department, type, details } = req.body;

    try {
        // Verify the department exists
        const departmentObj = await Department.findById(department.id);
        if (!departmentObj) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Create new request
        const newRequest = new Request({
            staff: {
                id: staff.id,
                name: staff.name
            },
            department: {
                id: department.id,
                name: departmentObj.name
            },
            type,
            details,
            document: req.file.filename, // Save the filename in the request object
            status: 'pending',
            deanApproved: 'pending',
            generalServiceApproved: 'pending'
        });

        // Save the request to the database
        await newRequest.save();

        res.status(201).json({ message: 'Request created successfully', request: newRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

