require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connecting Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Connection Error:", err));

// routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Backend is up and running!");
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


console.log("Mongo URI:", process.env.MONGO_URI);

