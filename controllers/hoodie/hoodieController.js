const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Font } = require("canvacord");
const { NymPost } = require("../../services/nymPost.jsx"); // Import your NymPost class
const { NymPosttwo } = require("../../services/nymPost_2.jsx");
const { NymPostone } = require("../../services/nymPost_1.jsx");
require("dotenv").config();
const {
  getBase64FromFile,
  generateUniqueFileName,
  getImageUrlForColor,
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
const createHoodie = async (name, type, definition) => {
  try {
    // 1. Generate the image using Canvacord and save it locally
    let whiteCard;
    let blackCard;
    if (type == 1) {
      console.log(type);
      whiteCard = new NymPostone({
        width: 3531, // Outer border width from your provided data
        height: 2352, // Outer border height from your provided data
        nymFontSize: "520px", // Default font size for Nym text
        nymLineHeight: "604.76px", // Default line height for Nym text
        definitionFontSize: "240px", // Default font size for Definition text
        definitionLineHeight: "281.76px", // Default line height for Definition text
        Nym: name,
        Definition: definition,
        NymColor: "#FFFFFF",
        formatNym: false, // Whether to format Nym to uppercase
        nymTop: 265, // Top position for Nym text
        definitionTop: 904, // Top position for Definition text
        left: 135, // Left position for both texts
        nymWidth: 3263, // Width for Nym text
        nymHeight: 558, // Height for Nym text
        definitionWidth: 3263, // Width for Definition text
        definitionHeight: 241, // Height for Definition text
        distanceBetweenTexts: 20, // Distance between Nym and Definition
      });

      blackCard = new NymPostone({
        width: 3531, // Outer border width from your provided data
        height: 2352, // Outer border height from your provided data
        nymFontSize: "520px", // Default font size for Nym text
        nymLineHeight: "604.76px", // Default line height for Nym text
        definitionFontSize: "240px", // Default font size for Definition text
        definitionLineHeight: "281.76px", // Default line height for Definition text
        Nym: name,
        Definition: definition,
        NymColor: "#000000",
        formatNym: false, // Whether to format Nym to uppercase
        nymTop: 265, // Top position for Nym text
        definitionTop: 904, // Top position for Definition text
        left: 135, // Left position for both texts
        nymWidth: 3263, // Width for Nym text
        nymHeight: 558, // Height for Nym text
        definitionWidth: 3263, // Width for Definition text
        definitionHeight: 241, // Height for Definition text
        distanceBetweenTexts: 20, // Distance between Nym and Definition
      });
    }

    if (type == 2) {
      console.log(type);
      whiteCard = new NymPosttwo({
        width: 3531, // Default outer container width
        height: 2352, // Default outer container height
        nymFontSize: "400px", // Default font size for Nym text
        nymLineHeight: "385px", // Default line height for Nym text
        Nym: name,
        NymColor: "#FFFFFF",
        formatNym: false, // Add this default parameter
        top: 356, // Top position for the text
        left: 599, // Left position for the text
        nymWidth: 2332, // Width for Nym text
        nymHeight: 1859, // Height for Nym text
      });

      blackCard = new NymPosttwo({
        width: 3531, // Default outer container width
        height: 2352, // Default outer container height
        nymFontSize: "400px", // Default font size for Nym text
        nymLineHeight: "385px", // Default line height for Nym text
        Nym: name,
        NymColor: "#000000",
        formatNym: false, // Add this default parameter
        top: 356, // Top position for the text
        left: 599, // Left position for the text
        nymWidth: 2332, // Width for Nym text
        nymHeight: 1859, // Height for Nym text
      });
    }

    if (type == 3) {
      console.log(type);
      whiteCard = new NymPost({
        width: 3531, // Default outer container width
        height: 2352, // Default outer container height
        nymFontSize: "500px", // Default font size for Nym text
        nymLineHeight: "470px", // Default line height for Nym text
        Nym: name,
        NymColor: "#FFFFFF",
        formatNym: false, // Add this default parameter
        top: 251, // Top position for the text
        left: 290, // Left position for the text
        nymWidth: 2951, // Width for Nym text
        nymHeight: 1989, // Height for Nym text
      });

      blackCard = new NymPost({
        width: 3531, // Default outer container width
        height: 2352, // Default outer container height
        nymFontSize: "500px", // Default font size for Nym text
        nymLineHeight: "470px", // Default line height for Nym text
        Nym: name,
        NymColor: "#000000",
        formatNym: false, // Add this default parameter
        top: 251, // Top position for the text
        left: 290, // Left position for the text
        nymWidth: 2951, // Width for Nym text
        nymHeight: 1989, // Height for Nym text
      });
    }
    const whiteImage = await whiteCard.build({ format: "png" });
    const whiteFileName = generateUniqueFileName();
    const whiteFilePath = path.join(
      __dirname,
      "../../public/assets/images",
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
      "../../public/assets/images",
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
    console.log("1");
    // 4. Create a product in Printify
    const productResponse = await axios.post(
      `https://api.printify.com/v1/shops/${shopId}/products.json`,
      {
        title: `Unisex Heavy Blend™ Hooded Sweatshirt`,
        description: `This unisex heavy blend hooded sweatshirt is relaxation itself. Made with a thick blend of cotton and polyester, it feels plush, soft and warm, a perfect choice for any cold day. In the front, the spacious kangaroo pocket adds daily practicality while the hood's drawstring is the same color as the base sweater for extra style points.<div>.:Made with a medium-heavy fabric (8.0 oz/yd² (271 g/m²)) that consists of 50% cotton and 50% polyester for that cozy feel and warmth you need in a hoodie.</div><div>.:The classic fit along with the pouch pocket and the tear-away label make for a highly comfortable, scratch-free wearing experience. </div><div>.:The color-matched drawcord and the double-lined hood add a stylish flair and durability that tie everything together.</div><div>.:Made using 100% ethically grown US cotton. Gildan is also a proud member of the US Cotton Trust Protocol ensuring ethical and sustainable means of production. The blank tee's dyes are OEKO-TEX-certified dyes with low environmental impact.</div><div>.:Fabric blends: Heather Sport colors - 60% polyester, 40% cotton</div>
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
          <td style="border: 1px solid #ddd; padding: 8px;" >1.50</td>
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
        blueprint_id: 77,
        print_provider_id: 99,
        tags: ["whimnym"],
        is_printify_express_enabled: true,
        variants: [
          {
            id: 42219, // Dark Chocolate S
            price: 2860,
            is_enabled: true,
          },
          {
            id: 42220, // Dark Chocolate M
            price: 2860,
            is_enabled: true,
          },
          {
            id: 42221, // Dark Chocolate L
            price: 2860,
            is_enabled: true,
          },
          {
            id: 42222, // Dark Chocolate XL
            price: 2860,
            is_enabled: true,
          },
          {
            id: 42223, // Dark Chocolate 2XL
            price: 3150,
            is_enabled: true,
          },
          {
            id: 42224, // Dark Chocolate 3XL
            price: 3300,
            is_enabled: true,
          },
          {
            id: 42225, // Dark Chocolate 4XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 42226, // Dark Chocolate 5XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 32910, // White S
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32911, // White M
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32912, // White L
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32913, // White XL
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32914, // White 2XL
            price: 3150,
            is_enabled: true,
          },
          {
            id: 32915, // White 3XL
            price: 3300,
            is_enabled: true,
          },
          {
            id: 32916, // White 4XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 32917, // White 5XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 32902, // Sport Grey S
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32903, // Sport Grey M
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32904, // Sport Grey L
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32905, // Sport Grey XL
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32906, // Sport Grey 2XL
            price: 3150,
            is_enabled: true,
          },
          {
            id: 32907, // Sport Grey 3XL
            price: 3300,
            is_enabled: true,
          },
          {
            id: 32908, // Sport Grey 4XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 32909, // Sport Grey 5XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 33409, // Cardinal Red S
            price: 2860,
            is_enabled: true,
          },
          {
            id: 33410, // Cardinal Red M
            price: 2860,
            is_enabled: true,
          },
          {
            id: 33411, // Cardinal Red L
            price: 2860,
            is_enabled: true,
          },
          {
            id: 33412, // Cardinal Red XL
            price: 2860,
            is_enabled: true,
          },
          {
            id: 33413, // Cardinal Red 2XL
            price: 3150,
            is_enabled: true,
          },
          {
            id: 33414, // Cardinal Red 3XL
            price: 3300,
            is_enabled: true,
          },
          {
            id: 33415, // Cardinal Red 4XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 33416, // Cardinal Red 5XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 32918, // Black S
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32919, // Black M
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32920, // Black L
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32921, // Black XL
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32922, // Black 2XL
            price: 3150,
            is_enabled: true,
          },
          {
            id: 32923, // Black 3XL
            price: 3300,
            is_enabled: true,
          },
          {
            id: 32924, // Black 4XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 32925, // Black 5XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 32886, // Maroon S
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32887, // Maroon M
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32888, // Maroon L
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32889, // Maroon XL
            price: 2860,
            is_enabled: true,
          },
          {
            id: 32890, // Maroon 2XL
            price: 3150,
            is_enabled: true,
          },
          {
            id: 32891, // Maroon 3XL
            price: 3300,
            is_enabled: true,
          },
          {
            id: 32892, // Maroon 4XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 32893, // Maroon 5XL
            price: 3380,
            is_enabled: true,
          },
          {
            id: 66363, // Heather Navy S
            price: 2860,
            is_enabled: true,
          },
          {
            id: 66364, // Heather Navy M
            price: 2860,
            is_enabled: true,
          },
          {
            id: 66365, // Heather Navy L
            price: 2860,
            is_enabled: true,
          },
          {
            id: 66366, // Heather Navy XL
            price: 2860,
            is_enabled: true,
          },
          {
            id: 66367, // Heather Navy 2XL
            price: 3150,
            is_enabled: true,
          },
          {
            id: 66368, // Heather Navy 3XL
            price: 3300,
            is_enabled: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [
              32902, 32903, 32904, 32905, 32906, 32907, 32908, 32909, 32910,
              32911, 32912, 32913, 32914, 32915, 32916, 32917,
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
              66363,
              66364,
              66365,
              66366,
              66367,
              66368,
              32886,
              32887,
              32888,
              32889,
              32890,
              32891,
              32892,
              32893,
              32918,
              32919,
              32920,
              32921,
              32922,
              32923,
              32924,
              32925,
              33409,
              33410,
              33411,
              33412,
              33413,
              33414,
              33415,
              33416,
              42219,
              42220,
              42221,
              42222,
              42223,
              42224,
              42225,
              42226, // 5XL
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
    console.log("Hoodie id:", productId);
    // 4. Publish the product to Shopify
    const data = await publishData(productId);
    if (data) {
      console.log("Product published to Shopify");
      // 5. Fetch the image URL for the white variant
      const whiteImageUrl = getImageUrlForColor(productResponse.data);
      console.log("Image url:", whiteImageUrl);
      return whiteImageUrl;
    } else {
      return;
    }
  } catch (error) {
    return error;
  }
};

module.exports = { createHoodie };
