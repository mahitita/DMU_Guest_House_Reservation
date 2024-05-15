const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const ticketRoutes = require("./routes/ticketRoutes");

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

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use ticket routes
app.use("/tickets", ticketRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
