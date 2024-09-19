const express = require("express");
const axios = require("axios");
const app = express();
const imageRoutes = require("../routes/SweatShirt_Routes"); // Import the routes

app.use(express.json()); // To parse JSON body data

app.use("/api/images", imageRoutes);

// Function to fetch and filter Printify blueprints
const fetchPrintifyBlueprints = async () => {
  try {
    const response = await axios.get(
      "https://api.printify.com/v1/catalog/blueprints.json",
      {
        headers: {
          Authorization: `Bearer ${process.env.PRINTIFY_ACCESS_TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching Printify blueprints:", error);
  }
};

// Simplified filter function based only on category
const filterBlueprints = (blueprints, category) => {
  return blueprints.filter((blueprint) =>
    blueprint.brand.toLowerCase().includes(category.toLowerCase())
  );
};

const printFilteredBlueprints = async () => {
  const blueprints = await fetchPrintifyBlueprints();
  if (blueprints) {
    const unisexTshirts = filterBlueprints(blueprints, "printify choice");
    const hoodies = filterBlueprints(blueprints, "hoodie");
    const mugs = filterBlueprints(blueprints, "mug");

    console.log("Unisex T-shirts:", unisexTshirts);
    console.log("Hoodies:", hoodies);
    console.log("Mugs:", mugs);
  }
};

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Fetch and print blueprints when the server starts
  await printFilteredBlueprints();
});
