const express = require("express");
const axios = require("axios");
const app = express();
const productRoutes = require("../routes/Products_Routes");

app.use(express.json()); // To parse JSON body data

app.use("/api/product", productRoutes);

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
