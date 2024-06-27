const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const Grid = require('gridfs-stream');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require("dotenv").config();

const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require('./routes/userRoutes');
const hrRoutes = require('./routes/hrRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const authenticateSuperAdmin = require('./middlewares/superAdminAuth');
const authRoutes = require('./routes/auth');
const requestRoutes = require('./routes/requestRoutes');
const roomRoutes = require('./routes/roomRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Atlas connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Initialize GridFS stream
let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return {
      filename: Date.now() + '-' + file.originalname,
      bucketName: 'uploads'
    };
  }
});

const upload = multer({ storage });

// Routes that require super admin authentication
app.post('/superadmin', authenticateSuperAdmin, (req, res) => {
  res.json({ message: 'Super admin authenticated successfully', user: req.user });
});

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use routes
app.use("/tickets", ticketRoutes);
app.use('/users', userRoutes);
app.use('/departments', departmentRoutes);
app.use('/hrusers', hrRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes); // No need to pass upload here
app.use('/rooms', roomRoutes);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
