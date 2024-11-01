require("dotenv").config();
const { postToInsta } = require("../instagrampost/instaController.js");
const { createTShirt } = require("../tshirt/tshirtController.js");
const { createHoodie } = require("../hoodie/hoodieController.js");
const { createMug } = require("../mug/mugController.js");
const postsSchema = require("../../models/instaPost.js");
const { createCandle } = require("../candle/candlecontroller.js");
const { NymPosteight } = require("../../services/nymPost_8.jsx");
const { NymPostseven } = require("../../services/nymPost_7.jsx");
const { uploadAndGeneratePublicUrl } = require("../../helper/urlGenerator.js");
const { generateUniqueFileName } = require("../../helper/helper.js");
const fs = require("fs");
const path = require("path");

const createAndUploadImage = async (req, res) => {
  try {
    const name = req.body.text_1;
    const type = req.body.design_id;
    const definition = req.body.text_2;
    const objectId = req.body._id;
    const tags = req.body.tags;
    const product_description = req.body.product_description;
    console.log(objectId);

    const tshirt = await createTShirt(
      name,
      type,
      definition,
      tags,
      product_description[0]
    );
    if (!tshirt) {
      res
        .status(400)
        .send("Error creating and uploading T-shirt image or product");
      return;
    }
    const hoodie = await createHoodie(
      name,
      type,
      definition,
      tags,
      product_description[1]
    );
    if (!hoodie) {
      res
        .status(400)
        .send("Error creating and uploading Hoodie image or product");
      return;
    }
    const mug = await createMug(
      name,
      type,
      definition,
      tags,
      product_description[2]
    );

    if (!mug) {
      res.status(400).send("Error creating and uploading Mug image or product");
      return;
    }
    const candle = await createCandle(
      name,
      type,
      definition,
      tags,
      product_description[3]
    );
    if (!candle) {
      res
        .status(400)
        .send("Error creating and uploading Candle image or product");
      return;
    }

    console.log("new design");

    let Card;

    if (type == 1) {
      Card = new NymPostseven({
        width: 1080, // Outer border width from your provided data
        height: 1080, // Outer border height from your provided data
        nymFontSize: "207px", // Default font size for Nym text
        nymLineHeight: "181px", // Default line height for Nym text
        definitionFontSize: "27px", // Default font size for Definition text
        definitionLineHeight: "29px", // Default line height for Definition text
        Nym: name,
        Definition: definition,
        NymColor: "#000000",
        formatNym: false, // Whether to format Nym to uppercase
        nymTop: 350, // Top position for Nym text
        definitionTop: 869, // Top position for Definition text
        // left: 20, // Left position for both texts
        nymWidth: 1080, // Width for Nym text
        nymHeight: 333, // Height for Nym text
        definitionWidth: 787, // Width for Definition text
        definitionHeight: 65, // Height for Definition text
        distanceBetweenTexts: 20, // Distance between Nym and Definition
        backgroundImageUrl: "https://i.imgur.com/4pM1pgM.jpeg", // Add background image URL parameter
      });
    }
    if (type == 2) {
      Card = new NymPosteight({
        width: 1080, // Width from your provided data
        height: 1080, // Height from your provided data
        nymFontSize: "190px", // Font size for Nym text
        nymLineHeight: "161px", // Line height for Nym text
        Nym: name, // The Nym text
        NymColor: "#000000", // Default text color
        formatNym: false, // Whether to format Nym to uppercase
        top: 247, // Top position from your provided data
        nymWidth: 1080, // Match width for Nym text
        nymHeight: 630, // Match height for Nym text
        backgroundImageUrl: "https://i.imgur.com/4pM1pgM.jpeg", // Add background image URL parameter
      });
    }

    if (type == 3) {
      Card = new NymPosteight({
        width: 1080, // Width from your provided data
        height: 1080, // Height from your provided data
        nymFontSize: "207px", // Font size for Nym text
        nymLineHeight: "181px", // Line height for Nym text
        Nym: name, // The Nym text
        NymColor: "#000000", // Default text color
        formatNym: true, // Whether to format Nym to uppercase
        top: 179, // Top position from your provided data
        nymWidth: 1080, // Match width for Nym text
        nymHeight: 705, // Match height for Nym text
        backgroundImageUrl: "https://i.imgur.com/4pM1pgM.jpeg", // Add background image URL parameter
      });
    }

    console.log("new design ", Card);
    let blackImage_1;
    try {
      // Generate image
      blackImage_1 = await Card.build({ format: "jpeg" });
      console.log("Image buffer generated.");
    } catch (error) {
      console.error("Error building the card:", error);
      return;
    }

    // Generate unique filename and define file path
    const blackFileName_1 = generateUniqueFileName("jpeg");
    console.log(blackFileName_1);
    const blackFilePath_1 = path.join(
      __dirname,
      "../../public/assets/images", // Ensure this directory exists
      blackFileName_1
    );

    console.log(blackFilePath_1);

    try {
      // Save the image buffer to a file
      fs.writeFileSync(blackFilePath_1, blackImage_1);
      console.log("Image saved to:", blackFilePath_1);
    } catch (error) {
      console.error("Error saving the image to the file system:", error);
      return;
    }
    let coverImage;
    try {
      // Upload the image and get the public URL
      coverImage = await uploadAndGeneratePublicUrl(blackFilePath_1);
      console.log("Cover Image URL:", coverImage);
    } catch (error) {
      console.error("Error uploading and generating public URL:", error);
    }

    console.log("Candle URL:", candle);
    console.log("Mug URL:", mug);
    console.log("T-Shirt URL:", tshirt);
    console.log("Hoodie URL:", hoodie);

    const images_url = [
      coverImage,
      candle,
      mug,
      tshirt,
      hoodie,
      "https://drive.usercontent.google.com/download?id=1n1KTEDWMTiQhVs9rKJ-NF7QYcMg4u01J&export=view&authuser=0",
    ];

    console.log(images_url);

    const db = await postsSchema.updateOne(
      { _id: objectId },
      { $push: { images: { $each: images_url } } }
    );

    if (db.modifiedCount === 0) {
      console.log(
        "No document matched the provided _id or no modifications were made."
      );
      res.status(400).send("Images not saved to database");
      return;
    }
    res.status(200).send("Success");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating and uploading image or product");
  }
};

module.exports = { createAndUploadImage };
