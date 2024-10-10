const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Font } = require("canvacord");
const { NymPost } = require("../services/NymPost.jsx"); // Import your NymPost class
const { NymPosttwo } = require("../services/NymPost_2.jsx");
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
    let blackCard;
    if (type == 1) {
      console.log(type);

      blackCard = new NymPost(2475, 1155)
        .setNym(name)
        .setDefinition(definition)
        .setNymColor("black")
        .setDefinitionColor("black")
        .setNymFontSize("100px")
        .setDefinitionFontSize("50px");
    }

    if (type == 2) {
      console.log(type);

      blackCard = new NymPosttwo(2475, 1155)
        .setNym(name)
        .setNymColor("black")
        .setNymFontSize("100px");
    }

    if (type == 3) {
      console.log(type);

      blackCard = new NymPosttwo(2475, 1155)
        .setNym(name)
        .setNymColor("black")
        .setNymFontSize("100px");
    }

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
        title: `Accent Coffee Mug (11, 15oz)`,
        description: `<div class="candle-description">
            <h2>Accent Coffee Mug</h2>
            <p>
              Meet your next favorite morning companion, the accented ceramic mug. This mug brings the perfect blend of style and functionality to elevate your coffee or tea ritual. Available in two generous sizes, 11oz (0.33 l) and 15oz (0.44 l), this mug offers ample space for your favorite brew. Made with white ceramic and sporting a sleek glossy finish with eye-catching contrast, this mug is a bliss both to use and to look at. The ergonomic C-shaped handle provides a comfortable grip, while the lead and BPA-free construction guarantee peace of mind with every sip.
            </p>

            <ul>
              <li><strong>Material:</strong> White ceramic with colored interior and handle</li>
              <li><strong>Available sizes:</strong> 11oz (0.33 l) and 15oz (0.44 l)</li>
              <li><strong>Colors:</strong> Choose from 5 interior and handle colors</li>
              <li><strong>Handle:</strong> C-shaped handle</li>
              <li><strong>Finish:</strong> Glossy finish</li>
              <li><strong>Design:</strong> Eye-catching color contrast</li>
              <li><strong>Safety:</strong> Lead and BPA-free</li>
            </ul>

          </div>
            <div style="overflow-x:auto;">
              <table style="border-collapse: collapse; width: 100%; text-align: left; min-width: 600px;">
                <thead>
                  <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;"></th>
                    <th style="border: 1px solid #ddd; padding: 8px;">11oz</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Height, in</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">3.78</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Diamter , in</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">3.23</td>
                  </tr>
                </tbody>
              </table>
            </div>`,
        blueprint_id: 635,
        print_provider_id: 28,
        tags: ["whimnym"],
        variants: [
          {
            id: 72180, // variant ID a
            price: 899,
            is_enabled: true,
          },
          {
            id: 72182, // variant ID b
            price: 899,
            is_enabled: true,
          },
          {
            id: 72183, // variant ID c
            price: 899,
            is_enabled: true,
          },
          {
            id: 72184, // variant ID d
            price: 899,
            is_enabled: true,
          },
          {
            id: 105883, // variant ID e
            price: 1099,
            is_enabled: true,
          },
          {
            id: 105885, // variant ID f
            price: 1099,
            is_enabled: true,
          },
          {
            id: 105886, // variant ID g
            price: 1099,
            is_enabled: true,
          },
          {
            id: 105887, // variant ID h
            price: 1099,
            is_enabled: true,
          },
          {
            id: 105888, // variant ID i
            price: 899,
            is_enabled: true,
          },
          {
            id: 105889, // variant ID j
            price: 1099,
            is_enabled: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [
              72180, 72182, 72183, 72184, 105883, 105885, 105886, 105887,
              105888, 105889,
            ], // 12oz variant
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
      return productImage3.src;
    } else {
      return;
    }
    // 6. Post the product image to Instagram
  } catch (error) {
    return error;
  }
};

module.exports = { createMug };
