const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const ticketRoutes = require("./routes/ticketRoutes");
const userRoutes = require('./routes/userRoutes');
const hrRoutes = require('./routes/hrRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const authenticateSuperAdmin = require('./middlewares/superAdminAuth');
const authRoutes = require('./routes/auth');

require('dotenv').config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas connection
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Routes that require super admin authentication
app.post('/superadmin', authenticateSuperAdmin, (req, res) => {
  res.json({ message: 'Super admin authenticated successfully', user: req.user });
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use ticket routes
app.use("/tickets", ticketRoutes);
app.use('/users', userRoutes);
app.use('/departments', departmentRoutes);
app.use('/hrusers', hrRoutes);
app.use('/api/auth', authRoutes);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
