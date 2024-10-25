const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Font } = require("canvacord");
const { NymPostfive } = require("../../services/nymPost_5.jsx");
const { NymPostsix } = require("../../services/nymPost_6.jsx");
require("dotenv").config();
const {
  getBase64FromFile,
  generateUniqueFileName,
} = require("../../helper/helper.js");
const {
  uploadImageToPrintify,
} = require("../printifyPost/printifyController.js");
const { publishData } = require("../shopify/shopifyController.js");

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
    let redCard;
    let pinkCard;
    let blueCard;
    let navyCard;

    if (type == 1) {
      console.log(type);

      blackCard = new NymPostsix({
        width: 2475,
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "17px", // Default line height for Nym text
        definitionFontSize: "67px", // Default font size for Definition text
        definitionLineHeight: "17px", // Default line height for Definition text
        Nym: name,
        Definition: definition,
        NymColor: "#000000",
        formatNym: true, // Add this default parameter
        top: 360, // Top position for the Nym text
        definitionTop: 547, // Top position for the Definition text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        definitionWidth: 849, // Width for Definition text
        nymHeight: 182, // Height for Nym text
        definitionHeight: 88, // Height for Definition text
      });

      redCard = new NymPostsix({
        width: 2475,
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "17px", // Default line height for Nym text
        definitionFontSize: "67px", // Default font size for Definition text
        definitionLineHeight: "17px", // Default line height for Definition text
        Nym: name,
        Definition: definition,
        NymColor: "#A92A1A",
        formatNym: true, // Add this default parameter
        top: 360, // Top position for the Nym text
        definitionTop: 547, // Top position for the Definition text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        definitionWidth: 849, // Width for Definition text
        nymHeight: 182, // Height for Nym text
        definitionHeight: 88, // Height for Definition text
      });

      pinkCard = new NymPostsix({
        width: 2475,
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "17px", // Default line height for Nym text
        definitionFontSize: "67px", // Default font size for Definition text
        definitionLineHeight: "17px", // Default line height for Definition text
        Nym: name,
        Definition: definition,
        NymColor: "#E0A19B",
        formatNym: true, // Add this default parameter
        top: 360, // Top position for the Nym text
        definitionTop: 547, // Top position for the Definition text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        definitionWidth: 849, // Width for Definition text
        nymHeight: 182, // Height for Nym text
        definitionHeight: 88, // Height for Definition text
      });

      blueCard = new NymPostsix({
        width: 2475,
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "17px", // Default line height for Nym text
        definitionFontSize: "67px", // Default font size for Definition text
        definitionLineHeight: "17px", // Default line height for Definition text
        Nym: name,
        Definition: definition,
        NymColor: "#4182A1",
        formatNym: true, // Add this default parameter
        top: 360, // Top position for the Nym text
        definitionTop: 547, // Top position for the Definition text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        definitionWidth: 849, // Width for Definition text
        nymHeight: 182, // Height for Nym text
        definitionHeight: 88, // Height for Definition text
      });

      navyCard = new NymPostsix({
        width: 2475,
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "17px", // Default line height for Nym text
        definitionFontSize: "67px", // Default font size for Definition text
        definitionLineHeight: "17px", // Default line height for Definition text
        Nym: name,
        Definition: definition,
        NymColor: "#191838",
        formatNym: true, // Add this default parameter
        top: 360, // Top position for the Nym text
        definitionTop: 547, // Top position for the Definition text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        definitionWidth: 849, // Width for Definition text
        nymHeight: 182, // Height for Nym text
        definitionHeight: 88, // Height for Definition text
      });
    }

    if (type == 2) {
      console.log(type);

      blackCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#000000",
        formatNym: false, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });

      redCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#A92A1A",
        formatNym: false, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });

      blueCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#4182A1",
        formatNym: false, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });

      pinkCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#E0A19B",
        formatNym: false, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });

      navyCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#191838",
        formatNym: false, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });
    }

    if (type == 3) {
      console.log(type);

      blackCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#000000",
        formatNym: true, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });

      redCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#A92A1A",
        formatNym: true, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });

      pinkCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#E0A19B",
        formatNym: true, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });

      blueCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#4182A1",
        formatNym: true, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });

      navyCard = new NymPostfive({
        width: 2475, // Default outer container width
        height: 1155, // Default outer container height
        nymFontSize: "160px", // Default font size for Nym text
        nymLineHeight: "155px", // Default line height for Nym text
        Nym: name,
        NymColor: "#191838",
        formatNym: true, // Add this default parameter
        top: 470, // Top position for the text
        left: 76, // Left position for the text
        nymWidth: 920, // Width for Nym text
        nymHeight: 182, // Height for Nym text
      });
    }

    // Separate variables to hold the image IDs
    let blackImageId = null;
    let redImageId = null;
    let pinkImageId = null;
    let blueImageId = null;
    let navyImageId = null;

    // Create an array of cards for processing
    const cards = [
      { card: blackCard, color: "black", variable: "blackImageId" },
      { card: redCard, color: "red", variable: "redImageId" },
      { card: pinkCard, color: "pink", variable: "pinkImageId" },
      { card: blueCard, color: "blue", variable: "blueImageId" },
      { card: navyCard, color: "navy", variable: "navyImageId" },
    ];

    // Loop through cards to build, save, convert to Base64, and upload
    for (const { card, color, variable } of cards) {
      const image = await card.build({ format: "png" });
      const fileName = generateUniqueFileName();
      const filePath = path.join(
        __dirname,
        "../../public/assets/images",
        fileName
      );

      // Save the image to the file system
      fs.writeFileSync(filePath, image);

      // Convert the saved image to Base64 format
      const base64Image = await getBase64FromFile(filePath);

      // Upload the card image to Printify and store the image ID in the corresponding variable
      if (variable === "blackImageId") {
        blackImageId = await uploadImageToPrintify(
          fileName,
          base64Image,
          token
        );
        console.log(`Black card uploaded with ID: ${blackImageId}`);
      } else if (variable === "redImageId") {
        redImageId = await uploadImageToPrintify(fileName, base64Image, token);
        console.log(`Red card uploaded with ID: ${redImageId}`);
      } else if (variable === "pinkImageId") {
        pinkImageId = await uploadImageToPrintify(fileName, base64Image, token);
        console.log(`Pink card uploaded with ID: ${pinkImageId}`);
      } else if (variable === "blueImageId") {
        blueImageId = await uploadImageToPrintify(fileName, base64Image, token);
        console.log(`Blue card uploaded with ID: ${blueImageId}`);
      } else if (variable === "navyImageId") {
        navyImageId = await uploadImageToPrintify(fileName, base64Image, token);
        console.log(`Navy card uploaded with ID: ${navyImageId}`);
      }
    }
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
            id: 72180, // variant ID Black
            price: 899,
            is_enabled: true,
          },
          {
            id: 72182, // variant ID Navy
            price: 899,
            is_enabled: true,
          },
          {
            id: 72183, // variant ID Pink
            price: 899,
            is_enabled: true,
          },
          {
            id: 72184, // variant ID Red
            price: 899,
            is_enabled: true,
          },
          {
            id: 105883, // variant ID Black
            price: 1099,
            is_enabled: true,
          },
          {
            id: 105885, // variant ID Navy
            price: 1099,
            is_enabled: true,
          },
          {
            id: 105886, // variant ID Pink
            price: 1099,
            is_enabled: true,
          },
          {
            id: 105887, // variant ID Red
            price: 1099,
            is_enabled: true,
          },
          {
            id: 105888, // variant ID Light Blue
            price: 899,
            is_enabled: true,
          },
          {
            id: 105889, // variant ID Light blue
            price: 1099,
            is_enabled: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [72180, 105883], // 12oz variant
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
          {
            variant_ids: [72182, 105885], // 12oz variant
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: navyImageId, // Image ID for black variant
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
          {
            variant_ids: [72183, 105886], // 12oz variant
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: pinkImageId, // Image ID for black variant
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
          {
            variant_ids: [72184, 105887], // 12oz variant
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: redImageId, // Image ID for black variant
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

          {
            variant_ids: [105889, 105888], // 12oz variant
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: blueImageId, // Image ID for black variant
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
            // background: "#00000",
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

    console.log("object: ", productResponse);

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
