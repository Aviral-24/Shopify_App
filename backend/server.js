require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const announcementRoutes = require("./routes/announcementRoutes");

const app = express();
connectDB();  // connect to MongoDB

// Updated CORS Policy
app.use(cors({
  origin: '*', // Sabhi websites (Vercel) ko allow karega
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Preflight requests ke liye zaroori
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Mount the announcement routes
app.use("/api/announcement", announcementRoutes);

// Simple root route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});