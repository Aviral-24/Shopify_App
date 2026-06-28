require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const announcementRoutes = require("./routes/announcementRoutes");

const app = express();
connectDB();  // connect to MongoDB

app.use(cors());
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
