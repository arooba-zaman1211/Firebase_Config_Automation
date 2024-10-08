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
  getImageUrlForColor,
  uploadImageToPrintify,
  publishData,
} = require("../helper/Helper.js");

const token = process.env.PRINTIFY_ACCESS_TOKEN;
const shopId = process.env.PRINTIFY_SHOP_ID;

console.log("token: ", token);

Font.fromFileSync("public/assets/fonts/Cardo/Cardo-Bold.ttf", "Cardo-Bold");
Font.fromFileSync("public/assets/fonts/Inter/Inter-Italic.ttf", "Inter-Italic");
Font.fromFileSync(
  "public/assets/fonts/Inter/Inter-Regular.ttf",
  "Inter-Regular"
);

// Controller function to generate and upload image
const createTShirt = async (name, type, definition) => {
  try {
    let whiteCard;
    let blackCard;
    if (type == 1) {
      console.log(type);
      whiteCard = new NymPost(3951, 4919)
        .setNym(name)
        .setDefinition(definition)
        .setNymColor("white")
        .setDefinitionColor("white")
        .setNymFontSize("550px")
        .setDefinitionFontSize("260px")
        .setMarginTop("386px")
        .setHeight("1946px");

      blackCard = new NymPost(3951, 4919)
        .setNym(name)
        .setDefinition(definition)
        .setNymColor("black")
        .setDefinitionColor("black")
        .setNymFontSize("550px")
        .setDefinitionFontSize("260px")
        .setMarginTop("386px")
        .setHeight("1946px");
    }

    if (type == 2) {
      console.log(type);
      whiteCard = new NymPosttwo(3951, 4919)
        .setNym(name)
        .setNymColor("white")
        .setNymFontSize("460px")
        .setMarginTop("403px")
        .setHeight("2244px")
        .setWidth("2915px")
        .setPadding("518px");

      blackCard = new NymPosttwo(3951, 4919)
        .setNym(name)
        .setNymColor("black")
        .setNymFontSize("460px")
        .setMarginTop("403px")
        .setHeight("2244px")
        .setWidth("2915px")
        .setPadding("518px");
    }

    if (type == 3) {
      console.log(type);
      whiteCard = new NymPosttwo(3951, 4919)
        .setNym(name)
        .setNymColor("white")
        .setNymFontSize("570px")
        .setHeight("3989px")
        .setPadding("540px");

      blackCard = new NymPosttwo(3951, 4919)
        .setNym(name)
        .setNymColor("black")
        .setNymFontSize("570px")
        .setHeight("3989px")
        .setPadding("540px");
    }
    // 1. Generate the image using Canvacord and save it locally

    const whiteImage = await whiteCard.build({ format: "png" });
    const whiteFileName = generateUniqueFileName();
    const whiteFilePath = path.join(
      __dirname,
      "../public/images",
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
        title: `Unisex Heavy Cotton Tee`,
        description: `The unisex heavy cotton tee is the basic staple of any wardrobe. It is the foundation upon which casual fashion grows. All it needs is a personalized design to elevate things to profitability. The specially spun fibers provide a smooth surface for premium printing vividity and sharpness. No side seams mean there are no itchy interruptions under the arms. The shoulders have tape for improved durability.
  
  <div>.: Made with medium fabric (5.3 oz/yd² (180 g/m²)) consisting of 100% cotton for year-round comfort that is sustainable and highly durable.</div>
  <div>.: The classic fit of this shirt ensures a comfy, relaxed wear while the crew neckline adds that neat, timeless look that can blend into any occasion, casual or semi-formal.</div>
  <div>.: The tear-away label means a scratch-free experience with no irritation or discomfort whatsoever.</div>
  <div>.: Made using 100% US cotton that is ethically grown and harvested. Gildan is also a proud member of the US Cotton Trust Protocol ensuring ethical and sustainable means of production. This blank tee is certified by Oeko-Tex for safety and quality assurance.</div>
  
  <div><strong>Size Chart:</strong></div>
  <div style="overflow-x:auto;">
    <table style="border-collapse: collapse; width: 100%; text-align: left; min-width: 600px;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Size</th>
          <th style="border: 1px solid #ddd; padding: 8px;">S</th>
          <th style="border: 1px solid #ddd; padding: 8px;">M</th>
          <th style="border: 1px solid #ddd; padding: 8px;">L</th>
          <th style="border: 1px solid #ddd; padding: 8px;">XL</th>
          <th style="border: 1px solid #ddd; padding: 8px;">2XL</th>
          <th style="border: 1px solid #ddd; padding: 8px;">3XL</th>
          <th style="border: 1px solid #ddd; padding: 8px;">4XL</th>
          <th style="border: 1px solid #ddd; padding: 8px;">5XL</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Width, in</td>
          <td style="border: 1px solid #ddd; padding: 8px;">18.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">20.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">22.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">24.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">26.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">28.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">30.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">32.00</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Length, in</td>
          <td style="border: 1px solid #ddd; padding: 8px;">28.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">29.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">30.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">31.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">32.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">33.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">34.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">35.00</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Sleeve length (from center back), in</td>
          <td style="border: 1px solid #ddd; padding: 8px;">15.10</td>
          <td style="border: 1px solid #ddd; padding: 8px;">16.50</td>
          <td style="border: 1px solid #ddd; padding: 8px;">18.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">19.50</td>
          <td style="border: 1px solid #ddd; padding: 8px;">21.00</td>
          <td style="border: 1px solid #ddd; padding: 8px;">22.40</td>
          <td style="border: 1px solid #ddd; padding: 8px;">23.70</td>
          <td style="border: 1px solid #ddd; padding: 8px;">25.00</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">Size tolerance, in</td>
          <td style="border: 1px solid #ddd; padding: 8px;">1.50</td>
          <td style="border: 1px solid #ddd; padding: 8px;" >1.50</td>
          <td style="border: 1px solid #ddd; padding: 8px;" >1.50</td>
          <td style="border: 1px solid #ddd; padding: 8px;" >1.50</td>
          <td style="border: 1px solid #ddd; padding: 8px;" >1.50</td>
          <td style="border: 1px solid #ddd; padding: 8px;" >1.50</td>
          <td style="border: 1px solid #ddd; padding: 8px;" >1.50</td>
          <td style="border: 1px solid #ddd; padding: 8px;" >1.50</td>
        </tr>
      </tbody>
    </table>
  </div>`,
        blueprint_id: 6,
        print_provider_id: 99,
        tags: ["whimnym"],
        is_printify_express_enabled: true,
        variants: [
          {
            id: 11898, // Dark Chocolate S
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11897, // Dark Chocolate M
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11896, // Dark Chocolate L
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11899, // Dark Chocolate XL
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11900, // Dark Chocolate 2XL
            price: 1420,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11901, // Dark Chocolate 3XL
            price: 1550,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 23963, // Dark Chocolate 4XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24097, // Dark Chocolate 5XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12102, // White S
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12101, // White M
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12100, // White L
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12103, // White XL
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12104, // White 2XL
            price: 1420,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12105, // White 3XL
            price: 1550,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24031, // White 4XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24164, // White 5XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12072, // Sport Grey S
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12071, // Sport Grey M
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12070, // Sport Grey L
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12073, // Sport Grey XL
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12074, // Sport Grey 2XL
            price: 1420,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12075, // Sport Grey 3XL
            price: 1550,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24021, // Sport Grey 4XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24153, // Sport Grey 5XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12132, // Cardinal Red S
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12131, // Cardinal Red M
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12130, // Cardinal Red L
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12133, // Cardinal Red XL
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12134, // Cardinal Red 2XL
            price: 1420,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12135, // Cardinal Red 3XL
            price: 1550,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24041, // Cardinal Red 4XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24173, // Cardinal Red 5XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12126, // Black S
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12125, // Black M
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12124, // Black L
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12127, // Black XL
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12128, // Black 2XL
            price: 1420,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 12129, // Black 3XL
            price: 1550,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24039, // Black 4XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24171, // Black 5XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11976, // Maroon S
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11975, // Maroon M
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11974, // Maroon L
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11977, // Maroon XL
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11978, // Maroon 2XL
            price: 1420,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 11979, // Maroon 3XL
            price: 1550,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 23989, // Maroon 4XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 24122, // Maroon 5XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 64727, // Heather Navy S
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 64728, // Heather Navy M
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 64729, // Heather Navy L
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 64730, // Heather Navy XL
            price: 1176,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 64731, // Heather Navy 2XL
            price: 1420,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 64732, // Heather Navy 3XL
            price: 1550,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 64733, // Heather Navy 4XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 64734, // Heather Navy 5XL
            price: 1650,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [
              12102, // S
              12101, // M
              12100, // L
              12103, // XL
              12104, // 2XL
              12105, // 3XL
              24031, // 4XL
              24164, // 5XL
              12072, // S
              12071, // M
              12070, // L
              12073, // XL
              12074, // 2XL
              12075, // 3XL
              24021, // 4XL
              24153, // 5XL
            ], // Assign black image to these variants
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
              64727, // S
              64728, // M
              64729, // L
              64730, // XL
              64731, // 2XL
              64732, // 3XL
              64733, // 4XL
              64734, // 5XL
              11976, // S
              11975, // M
              11974, // L
              11977, // XL
              11978, // 2XL
              11979, // 3XL
              23989, // 4XL
              24122, // 5XL
              12126, // S
              12125, // M
              12124, // L
              12127, // XL
              12128, // 2XL
              12129, // 3XL
              24039, // 4XL
              24171, // 5XL
              12132, // S
              12131, // M
              12130, // L
              12133, // XL
              12134, // 2XL
              12135, // 3XL
              24041, // 4XL
              24173, // 5XL
              11898, // S
              11897, // M
              11896, // L
              11899, // XL
              11900, // 2XL
              11901, // 3XL
              23963, // 4XL
              24097, // 5XL
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
          {
            variant_ids: [
              11974,
              11975,
              11976,
              11977,
              11978,
              11979, // Maroon
              12124,
              12125,
              12126,
              12127,
              12128,
              12129, // Black
              12190,
              12191,
              12192,
              12193,
              12194,
              12195, // Military Green
              23989, // Maroon
              24039, // Black
              24060, // Military Green
              24122, // Maroon
              24171, // Black
              24194, // Military Green
            ],
            placeholders: [
              {
                position: "other",
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

    console.log("Product id:", productId);
    const data = await publishData(productId);

    if (data) {
      console.log("Product published to Shopify");
      const whiteImageUrl = getImageUrlForColor(productResponse.data);
      return whiteImageUrl;
    } else {
      return;
    }
  } catch (error) {
    return error;
  }
};

module.exports = { createTShirt };
