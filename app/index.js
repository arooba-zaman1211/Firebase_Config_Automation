const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("../routes/Products_Routes");
const connectDB = require("../config/dbConnection.js");
app.use(express.json()); // To parse JSON body data

app.use("/api/product", productRoutes);

// Server listen
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
