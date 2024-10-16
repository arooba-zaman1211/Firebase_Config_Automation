const express = require("express");
const app = express();
const productRoutes = require("../routes/Products_Routes");
const connectDB = require("../config/dbConnection.js");
const { NymPostthree } = require("../services/NymPost_3.jsx");
const { NymPostfour } = require("../services/NymPost_4.jsx");
const { NymPostfive } = require("../services/NymPost_5.jsx");
const { NymPostsix } = require("../services/NymPost_6.jsx");
const { NymPost } = require("../services/NymPost.jsx");
const { generateUniqueFileName } = require("../helper/Helper.js");
const path = require("path");
const fs = require("fs");
app.use(express.json()); // To parse JSON body data
require("dotenv").config();

app.use("/api/product", productRoutes);

// Server listen
const PORT = process.env.PORT || 3000;

connectDB();

/*async function filterByColor(printProviderId, blueprintId, color) {
  const url = `https://api.printify.com/v1/catalog/blueprints/${blueprintId}/print_providers/${printProviderId}/variants.json`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${PRINTIFY_ACCESS_TOKEN}`,
      },
    });
    const variants = response.data.variants;
    console.log("Color is : ", color);
    // Filter variants by the specified color
    const filteredVariants = variants.filter(
      (variant) => variant.options.color === color
    );

    return filteredVariants;
  } catch (error) {
    console.error("Error fetching variants:", error);
    return [];
  }
}

// Example usage: Filtering by "Dark Heather" color
filterByColor(99, 145, "Maroon")
  .then((filteredVariants) => {
    console.log("Filtered Variants:", filteredVariants);
  })
  .catch((error) => {
    console.error("Error:", error);
  });*/

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

// ID 1 Design
/*const whiteCard = new NymPost(3951, 4919)
  .setNym("Hello! I am Nat")
  .setDefinition("short for Natural disaster")
  .setNymColor("white")
  .setDefinitionColor("white")
  .setNymFontSize("550px")
  .setDefinitionFontSize("260px")
  .setMarginTop("386px")
  .setHeight("1946px");*/

// ID 3 Design
/*const whiteCard = new NymPosttwo(3951, 4919)
  .setNym("Caught Flipping Again")
  .setNymColor("white")
  .setDefinitionColor("white")
  .setNymFontSize("570px")
  .setHeight("3989px")
  .setPadding("540px");*/

//  ID 2 Design
/*
const whiteCard = new NymPosttwo(3951, 4919)
  .setNym("If at first you don't succeed give up, it's easier.")
  .setNymColor("white")
  .setNymFontSize("460px")
  .setMarginTop("403px")
  .setHeight("2244px")
  .setWidth("2915px")
  .setPadding("518px");
*/

/*const whiteCard = new NymPostthree({
  width: 863,
  height: 706,
  innerBorderWidth: 695,
  innerBorderHeight: 563,
  innerBorderTop: 71,
  innerBorderLeft: 91,
  nymWidth: 534,
  nymHeight: 372,
  nymTop: 167,
  nymLeft: 164,
  nymFontSize: "92px",
  nymLineHeight: "85px",
  bottomTextWidth: 252,
  bottomTextHeight: 32,
  bottomTextTop: 500,
  bottomTextLeft: 305,
  bottomFontSize: "22px",
  bottomLineHeight: "21px",
  Nym: "caught flipping again",
  BottomText: "Soy Wax Candle \n 9 oz / 45+ hours",
  NymColor: "#000000",
  formatNym: true,
});*/

whiteCard = new NymPost({
  width: 3852, // Default outer container width
  height: 4398, // Default outer container height
  nymFontSize: "570px", // Default font size for Nym text
  nymLineHeight: "662.91px", // Default line height for Nym text
  Nym: "caught\nflipping\nagain",
  NymColor: "#000000",
  formatNym: false, // Add this default parameter
  top: 245, // Top position for the text
  left: 223, // Left position for the text
  nymWidth: 3505, // Width for Nym text
  nymHeight: 3989, // Height for Nym text
});

const saveWhiteCard = async () => {
  try {
    const whiteImage = await whiteCard.build({ format: "png" }); // Await the result of build
    const whiteFileName = generateUniqueFileName();
    const whiteFilePath = path.join(
      __dirname,
      "../public/images",
      whiteFileName
    );

    // Save the white image to the file system
    fs.writeFileSync(whiteFilePath, whiteImage); // Now whiteImage will be a Buffer
    console.log("Image saved successfully:", whiteFilePath);
  } catch (error) {
    console.error("Error saving image:", error);
  }
};

// Call the async function to save the image
saveWhiteCard();
