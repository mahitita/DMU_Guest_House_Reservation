const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage'); // Correct import statement

const storage = new GridFsStorage({
    url: 'mongodb://localhost:27017/your_database_name', // Replace with your MongoDB connection string
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return {
            bucketName: 'uploads', // Name of the GridFS collection
            filename: file.originalname // Store original file name
        };
    }
});

const upload = multer({ storage });

module.exports = upload;
