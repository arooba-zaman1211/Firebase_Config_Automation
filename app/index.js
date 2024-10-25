const express = require("express");

const app = express();
const productRoutes = require("../routes/Products_Routes");
const connectDB = require("../config/dbConnection.js");
app.use(express.json()); // To parse JSON body data
require("dotenv").config();
const { watchPostCollection } = require("../helper/changeStreamHandler.js");

// Middleware to parse JSON body data
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    // Start watching the posts collection for changes
    watchPostCollection();
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Register product routes
app.use("/api/product", productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
