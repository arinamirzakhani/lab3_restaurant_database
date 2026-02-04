require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const restaurantRoutes = require("./routes/restaurantRoutes");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/restaurants", restaurantRoutes);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
