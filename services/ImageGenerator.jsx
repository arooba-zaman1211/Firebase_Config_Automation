const { Font } = require("canvacord");
const { NymPost } = require("../services/NymPost.jsx");
const fs = require("fs");
const path = require("path");

// Load fonts
Font.fromFileSync("public/assets/fonts/Cardo/Cardo-Bold.ttf", "Cardo-Bold");
Font.fromFileSync("public/assets/fonts/Inter/Inter-Italic.ttf", "Inter-Italic");
Font.fromFileSync(
  "public/assets/fonts/Inter/Inter-Regular.ttf",
  "Inter-Regular"
);

// Create post
const card = new NymPost()
  .setNym("Snackccident")
  .setType("noun.")
  .setDefinition(
    "The unintentional consumption of an entire bag of chips in one sitting."
  );

// for generating as many pics we want having unique name for each depending on timestamp
const generateUniqueFileName = () => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  return `nym_post_${timestamp}.png`;
};

card.build({ format: "png" }).then((image) => {
  const fileName = generateUniqueFileName();
  const outputPath = path.join(__dirname, "../public/images", fileName);
  fs.writeFileSync(outputPath, image);
  console.log(`Image saved as: ${fileName}`);
});
