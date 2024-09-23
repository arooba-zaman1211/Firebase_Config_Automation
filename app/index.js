const express = require("express");
const axios = require("axios");
const app = express();
const imageRoutes = require("../routes/SweatShirt_Routes"); // Import the routes
const mugRoutes = require("../routes/Latte_Routes");
const hoodieRoutes = require("../routes/Hoodie_Routes");

app.use(express.json()); // To parse JSON body data

app.use("/api/images", imageRoutes);
app.use("/api/mugs", mugRoutes);
app.use("/api/hoodie", hoodieRoutes);

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

// Filter function based on the product name
const filterBlueprintsByName = (blueprints, name) => {
  return blueprints.filter((blueprint) =>
    blueprint.title.toLowerCase().includes(name.toLowerCase())
  );
};

const printFilteredBlueprints = async () => {
  const blueprints = await fetchPrintifyBlueprints();
  if (blueprints) {
    const hoodie = filterBlueprintsByName(blueprints, "Unisex Heavy Blend");

    console.log("Unisex Heavy Blend Hooded Sweatshirt:", hoodie);
  }
};

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Fetch and print blueprints when the server starts
  await printFilteredBlueprints();
});
