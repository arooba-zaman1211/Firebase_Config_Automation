const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Font } = require("canvacord");
const { NymPost } = require("../services/NymPost.jsx"); // Import your NymPost class
require("dotenv").config();
const {
  getBase64FromFile,
  generateUniqueFileName,
  uploadImageToPrintify,
  publishData,
} = require("../helper/Helper.js");

const token = process.env.PRINTIFY_ACCESS_TOKEN;
const shopId = process.env.PRINTIFY_SHOP_ID;

Font.fromFileSync("public/assets/fonts/Cardo/Cardo-Bold.ttf", "Cardo-Bold");
Font.fromFileSync("public/assets/fonts/Inter/Inter-Italic.ttf", "Inter-Italic");
Font.fromFileSync(
  "public/assets/fonts/Inter/Inter-Regular.ttf",
  "Inter-Regular"
);

// Controller function to generate and upload image
const createMug = async (name, type, definition) => {
  try {
    // 1. Create the second card (Black Text)
    const blackCard = new NymPost(1988, 1196)
      .setNym(name)
      .setType(type)
      .setDefinition(definition)
      .setNymColor("black")
      .setTypeColor("black")
      .setDefinitionColor("black")
      .setNymFontSize("100px")
      .setTypeFontSize("20px")
      .setDefinitionFontSize("50px")
      .setMarginTop("200px")
      .setWidth("500px")
      .setHeight("500px")
      .setPadding("100px 50px");

    const blackImage = await blackCard.build({ format: "png" });
    const blackFileName = generateUniqueFileName();
    const blackFilePath = path.join(
      __dirname,
      "../public/images",
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
        title: `Latte Mug`,
        description: `A true coffee lover knows that each variety of the aromatic drink deserves a special cup. These custom latte mugs come with high quality sublimation printing and make the perfect gift for any latte enthusiast. All our custom latte mugs feature stylish rounded corners, can accommodate 12 oz of delicious latte coffee and come with a comfy C-style handle for effortless sipping. <br/><div>.:Custom latte mugs, 12oz (0.35 l)</div><div>.:Rounded corners</div><br /><div>.:C-Handle</div><div>.:All custom latte mugs are made 100% white ceramic</div>
        <div><strong>Size Chart:</strong></div>
  <div style="overflow-x:auto;">
    <table style="border-collapse: collapse; width: 100%; text-align: left; min-width: 600px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;"></th>
          <th style="border: 1px solid #ddd; padding: 8px;">12oz</th>
          
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Height, in</td>
          <td style="border: 1px solid #ddd; padding: 8px;">4.02</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Diameter , in</td>
          <td style="border: 1px solid #ddd; padding: 8px;">3.70</td>
        </tr>
      </tbody>
    </table>
  </div>`,
        blueprint_id: 289,
        print_provider_id: 1,
        tags: ["whimnym"],
        variants: [
          {
            id: 43321, // 12oz variant ID
            price: 1050,
            is_enabled: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [43321], // 12oz variant
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: blackImageId, // Image ID for black variant
                    x: 0.5,
                    y: 0.5,
                    scale: 1,
                    angle: 0,
                  },
                ],
                height: 1196, // Custom height for 12oz variant
                width: 1988, // Custom width for 12oz variant
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
    console.log(productId);
    const productImage1 = productResponse.data.images[0];
    const productImage2 = productResponse.data.images[1];
    const productImage3 = productResponse.data.images[2];
    console.log("product response 1: ", productImage1);
    console.log("product response 2: ", productImage2);
    console.log("product response 3: ", productImage3);
    // 4. Publish the product to Shopify

    const data = await publishData(productId);
    if (data) {
      return productImage2.src;
    } else {
      return;
    }
    // 6. Post the product image to Instagram
  } catch (error) {
    return error;
  }
};

module.exports = { createMug };
