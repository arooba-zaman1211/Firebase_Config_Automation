const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("../routes/Products_Routes");
const connectDB = require("../config/dbConnection.js");
const axios = require("axios");
app.use(express.json()); // To parse JSON body data

app.use("/api/product", productRoutes);

// Server listen
const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

async function getMaroonVariants() {
  try {
    const response = await axios.get(
      "https://api.printify.com/v1/catalog/blueprints/77/print_providers/99/variants.json",
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_ACCESS_TOKEN}`, // Replace with your Printify API token
        },
      }
    );

    // Filter out the Maroon variants
    const maroonVariants = response.data.variants.filter(
      (variant) => variant.options.color.toLowerCase() === "dark chocolate"
    );

    console.log(maroonVariants); // Log the filtered Maroon variants
  } catch (error) {
    console.error("Error fetching variants:", error);
  }
}

getMaroonVariants();
