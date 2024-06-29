const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const multer = require('./middlewares/multer');
const path = require('path');

// Import your routes
const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require('./routes/userRoutes');
const hrRoutes = require('./routes/hrRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const authenticateSuperAdmin = require('./middlewares/superAdminAuth');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // Import the booking routes

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Static folder for serving uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes that require super admin authentication
app.post('/superadmin', authenticateSuperAdmin, (req, res) => {
  res.json({ message: 'Super admin authenticated successfully', user: req.user });
});

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use your routes
app.use("/tickets", ticketRoutes);
app.use('/users', userRoutes);
app.use('/departments', departmentRoutes);
app.use('/hrusers', hrRoutes);
app.use('/api/auth', authRoutes);
app.use('/rooms', roomRoutes);
app.use('/bookings', upload.single('idImage'), bookingRoutes); // Use the booking routes with multer middleware

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
