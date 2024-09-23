const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Font } = require("canvacord");
const { NymPost } = require("../../services/NymPost.jsx"); // Import your NymPost class
require("dotenv").config();
const {
  getBase64FromFile,
  generateUniqueFileName,
  postToInsta,
  getImageUrlForColor,
  uploadImageToPrintify,
} = require("../../helper/Helpers.js");

const token = process.env.PRINTIFY_ACCESS_TOKEN;
const shopId = process.env.PRINTIFY_SHOP_ID;

Font.fromFileSync("public/assets/fonts/Cardo/Cardo-Bold.ttf", "Cardo-Bold");
Font.fromFileSync("public/assets/fonts/Inter/Inter-Italic.ttf", "Inter-Italic");
Font.fromFileSync(
  "public/assets/fonts/Inter/Inter-Regular.ttf",
  "Inter-Regular"
);

// Controller function to generate and upload image
const createAndUploadImage = async (req, res) => {
  try {
    // 1. Generate the image using Canvacord and save it locally
    const whiteCard = new NymPost(3531, 2352)
      .setNym(req.body.nym)
      .setType(req.body.type)
      .setDefinition(req.body.definition)
      .setNymColor("white")
      .setTypeColor("white")
      .setDefinitionColor("white");

    const whiteImage = await whiteCard.build({ format: "png" });
    const whiteFileName = generateUniqueFileName();
    const whiteFilePath = path.join(
      __dirname,
      "../../public/images",
      whiteFileName
    );

    // Save the white image to the file system
    fs.writeFileSync(whiteFilePath, whiteImage);

    // Convert the saved white image to Base64 format
    const whiteBase64Image = await getBase64FromFile(whiteFilePath);

    // Upload white card image to Printify
    const whiteImageId = await uploadImageToPrintify(
      whiteFileName,
      whiteBase64Image,
      token
    );
    console.log(`White card uploaded with ID: ${whiteImageId}`);

    // 2. Create the second card (Black Text)
    const blackCard = new NymPost(3531, 2352)
      .setNym(req.body.nym)
      .setType(req.body.type)
      .setDefinition(req.body.definition)
      .setNymColor("black")
      .setTypeColor("black")
      .setDefinitionColor("black");

    const blackImage = await blackCard.build({ format: "png" });
    const blackFileName = generateUniqueFileName();
    const blackFilePath = path.join(
      __dirname,
      "../../public/images",
      blackFileName
    );

    // Save the black image to the file system
    fs.writeFileSync(blackFilePath, blackImage);

    // Convert the saved black image to Base64 format
    const blackBase64Image = await getBase64FromFile(blackFilePath);

    // Upload black card image to Printify
    const blackImageId = await uploadImageToPrintify(
      blackFileName,
      blackBase64Image,
      token
    );
    console.log(`Black card uploaded with ID: ${blackImageId}`);

    // 4. Create a product in Printify
    const productResponse = await axios.post(
      `https://api.printify.com/v1/shops/${shopId}/products.json`,
      {
        title: "Custom Hoodie",
        description: "A high-quality custom t-shirt with your design.",
        blueprint_id: 77,
        print_provider_id: 72,
        variants: [
          {
            id: 64682, // Sapphire (White)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 64683, // Sapphire (White)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32903, // Sports Grey (Black)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32904, // Sports Grey (Black)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32919, // Black (White)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32920, // Black (White)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33426, // Military Green (White)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33427, // Military Green (White)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32887, // Maroon (White)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32886, // Maroon (White)
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32888, // Maroon (White)
            price: 2000,
            is_enabled: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [32903, 32904], // Assign black image to these variants
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: blackImageId, // Black image ID goes here
                    x: 0.5,
                    y: 0.5,
                    scale: 1,
                    angle: 0,
                  },
                ],
              },
            ],
          },
          {
            variant_ids: [
              32887, 32886, 32888, 33426, 33427, 64682, 64683, 32919, 32920,
            ],
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: whiteImageId, // White image ID goes here
                    x: 0.5,
                    y: 0.5,
                    scale: 1,
                    angle: 0,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const productId = productResponse.data.id;
    console.log("images: ", productResponse.data.images);
    // 4. Publish the product to Shopify
    const requestData = {
      title: true,
      description: true,
      images: true,
      variants: true,
      tags: true,
      keyFeatures: true,
      shipping_template: true,
    };

    const publishResponse = await axios.post(
      `https://api.printify.com/v1/shops/${shopId}/products/${productId}/publish.json`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Product published to Shopify:", publishResponse.data);
    // 5. Fetch the image URL for the white variant
    const whiteImageUrl = getImageUrlForColor(productResponse.data, "Maroon");
    console.log("Image url:", whiteImageUrl);

    // 6. Post the product image to Instagram
    if (whiteImageUrl) {
      await postToInsta({
        caption: `Check out our new Maroon Hoodie! #CustomTshirt #Printify`,
        image_url: whiteImageUrl,
      });

      res.status(200).json(productResponse.data);
    } else {
      res.status(404).send("Asphalt variant image URL not found");
    }
  } catch (error) {
    console.error(
      "Error creating and uploading image or product:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send("Error creating and uploading image or product");
  }
};

// Export the controller function
module.exports = {
  createAndUploadImage,
};
