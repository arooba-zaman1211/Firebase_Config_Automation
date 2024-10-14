const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Font } = require("canvacord");
const { NymPost } = require("../services/NymPost.jsx"); // Import your NymPost class
const { NymPosttwo } = require("../services/NymPost_2.jsx");
const { NymPostthree } = require("../services/NymPost_3.jsx");
require("dotenv").config();
const {
  getBase64FromFile,
  generateUniqueFileName,
  uploadImageToPrintify,
  publishData,
} = require("../helper/Helper.js");
const { NymPostfour } = require("../services/NymPost_4.jsx");

const token = process.env.PRINTIFY_ACCESS_TOKEN;
const shopId = process.env.PRINTIFY_SHOP_ID;

Font.fromFileSync("public/assets/fonts/Cardo/Cardo-Bold.ttf", "Cardo-Bold");
Font.fromFileSync("public/assets/fonts/Inter/Inter-Italic.ttf", "Inter-Italic");
Font.fromFileSync(
  "public/assets/fonts/Inter/Inter-Regular.ttf",
  "Inter-Regular"
);

// Controller function to generate and upload image
const createCandle = async (name, type, definition) => {
  try {
    let black4oz;
    let black9oz;
    if (type == 1) {
      console.log(type);

      black4oz = new NymPostfour({
        formatNym: false,
        Nym: name,
        Definition: definition,
      });
      black9oz = new NymPostfour({
        width: 863,
        height: 706,
        innerBorderWidth: 695,
        innerBorderHeight: 563,
        innerBorderTop: 71,
        innerBorderLeft: 91,
        nymWidth: 513,
        nymHeight: 60,
        nymFontSize: "100px",
        nymLineHeight: "116.3px",
        definitionWidth: 580,
        definitionHeight: 24,
        definitionFontSize: "41px",
        definitionLineHeight: "17px",
        bottomTextWidth: 252,
        bottomTextHeight: 32,
        bottomTextTop: 500,
        bottomFontSize: "22px",
        bottomLineHeight: "21px",
        Nym: name,
        Definition: definition,
        BottomText: "Soy Wax Candle \n 9 oz / 45+ hours",
        NymColor: "#000000",
        formatNym: false,
      });
    }

    if (type == 2) {
      console.log(type);

      black4oz = new NymPostthree({
        width: 624,
        height: 546,
        innerBorderWidth: 458,
        innerBorderHeight: 400,
        innerBorderTop: 73,
        innerBorderLeft: 83,
        nymWidth: 305,
        nymHeight: 211,
        nymTop: 167,
        nymLeft: 160,
        nymFontSize: "50px",
        nymLineHeight: "50px",
        bottomTextWidth: 252,
        bottomTextHeight: 32,
        bottomTextTop: 350,
        bottomTextLeft: 186,
        bottomFontSize: "17px",
        bottomLineHeight: "17px",
        Nym: name,
        NymColor: "#000000",
        formatNym: false,
      });

      black9oz = new NymPostthree({
        width: 863,
        height: 706,
        innerBorderWidth: 695,
        innerBorderHeight: 563,
        innerBorderTop: 71,
        innerBorderLeft: 91,
        nymWidth: 514,
        nymHeight: 302,
        nymTop: 202,
        nymLeft: 174,
        nymFontSize: "80px",
        nymLineHeight: "70px",
        bottomTextWidth: 252,
        bottomTextHeight: 32,
        bottomTextTop: 500,
        bottomTextLeft: 305,
        bottomFontSize: "22px",
        bottomLineHeight: "21px",
        Nym: name,
        BottomText: "Soy Wax Candle \n 9 oz / 45+ hours",
        NymColor: "#000000",
        formatNym: false,
      });
    }

    if (type == 3) {
      console.log(type);

      black4oz = new NymPostthree({
        Nym: name,
      });

      black9oz = new NymPostthree({
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
        Nym: name,
        BottomText: "Soy Wax Candle \n 9 oz / 45+ hours",
        NymColor: "#000000",
        formatNym: true,
      });
    }

    const blackImage_1 = await black4oz.build({ format: "png" });
    const blackFileName_1 = generateUniqueFileName();
    const blackFilePath_1 = path.join(
      __dirname,
      "../public/images",
      blackFileName_1
    );

    // Save the black image to the file system
    fs.writeFileSync(blackFilePath_1, blackImage_1);

    // Convert the saved black image to Base64 format
    const blackBase64Image_1 = await getBase64FromFile(blackFilePath_1);

    // Upload black card image to Printify
    const blackImageId_1 = await uploadImageToPrintify(
      blackFileName_1,
      blackBase64Image_1,
      token
    );
    console.log(`Black card uploaded with ID: ${blackImageId_1}`);

    const blackImage_2 = await black9oz.build({ format: "png" });
    const blackFileName_2 = generateUniqueFileName();
    const blackFilePath_2 = path.join(
      __dirname,
      "../public/images",
      blackFileName_2
    );

    // Save the black image to the file system
    fs.writeFileSync(blackFilePath_2, blackImage_2);

    // Convert the saved black image to Base64 format
    const blackBase64Image_2 = await getBase64FromFile(blackFilePath_2);

    // Upload black card image to Printify
    const blackImageId_2 = await uploadImageToPrintify(
      blackFileName_2,
      blackBase64Image_2,
      token
    );
    console.log(`Black card uploaded with ID: ${blackImageId_2}`);

    // 4. Create a product in Printify
    const productResponse = await axios.post(
      `https://api.printify.com/v1/shops/${shopId}/products.json`,
      {
        title: `Scented Coconut Apricot Candles (4oz, 9oz)`,
        description: `<div class="candle-description">
            <h2>Scented Coconut Apricot Candles</h2>
            <p>
              These scented candles are hand-poured in the USA, and made from premium coconut apricot wax with cotton wicks that are lead and zinc-free. With a burn time of approximately 20 hours, they provide long-lasting fragrance and warmth. The candles come in 9 scents, as well as in elegant amber and classic clear vessels, topped with a stylish gold lid, making them a beautiful, ambient addition to any space.
            </p>

            <ul>
              <li><strong>Material: </strong>coconut apricot wax, cotton wick</li>
              <li><strong>Lid: </strong>gold</li>
              <li><strong>Vessel color:</strong> amber and clear</li>
              <li><strong>Burn time:</strong> up to 20 hours (4oz), up to 50 hours (9oz)</li>
              <li> NB! All scents have the same natural color</li>
              <li> Compliant with ASTM safety standards</li>
              <li> Assembled in the USA from globally sourced parts</li>
            </ul>

          </div>
            <div style="overflow-x:auto;">
              <table style="border-collapse: collapse; width: 100%; text-align: left; min-width: 600px;">
                <thead>
                  <tr>
                    <th style="border: 1px solid #ddd; padding: 8px;"></th>
                    <th style="border: 1px solid #ddd; padding: 8px;">4oz</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Diamter, in</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">2.30</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;">Height , in</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">2.50</td>
                  </tr>
                </tbody>
              </table>
            </div>`,
        blueprint_id: 1488,
        print_provider_id: 70,
        tags: ["whimnym"],
        variants: [
          {
            id: 107587, // variant ID a
            price: 999,
            is_enabled: true,
          },
          {
            id: 107588, // variant ID b
            price: 999,
            is_enabled: true,
          },
          {
            id: 107589, // variant ID c
            price: 999,
            is_enabled: true,
          },
          {
            id: 107590, // variant ID d
            price: 999,
            is_enabled: true,
          },
          {
            id: 107591, // variant ID e
            price: 999,
            is_enabled: true,
          },
          {
            id: 107592, // variant ID f
            price: 999,
            is_enabled: true,
          },
          {
            id: 107593, // variant ID g
            price: 999,
            is_enabled: true,
          },
          {
            id: 107594, // variant ID h
            price: 999,
            is_enabled: true,
          },
          {
            id: 107595, // variant ID i
            price: 999,
            is_enabled: true,
          },
          {
            id: 107596, // variant ID j
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107597, // variant ID k
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107598, // variant ID l
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107599, // variant ID m
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107600, // variant ID n
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107601, // variant ID o
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107602, // variant ID p
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107603, // variant ID q
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107604, // variant ID r
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107605, // variant ID s
            price: 999,
            is_enabled: true,
          },
          {
            id: 107606, // variant ID t
            price: 999,
            is_enabled: true,
          },
          {
            id: 107607, // variant ID u
            price: 999,
            is_enabled: true,
          },
          {
            id: 107608, // variant ID v
            price: 999,
            is_enabled: true,
          },
          {
            id: 107609, // variant ID w
            price: 999,
            is_enabled: true,
          },
          {
            id: 107610, // variant ID x
            price: 999,
            is_enabled: true,
          },
          {
            id: 107611, // variant ID y
            price: 999,
            is_enabled: true,
          },
          {
            id: 107612, // variant ID z
            price: 999,
            is_enabled: true,
          },
          {
            id: 107613, // variant ID aa
            price: 999,
            is_enabled: true,
          },
          {
            id: 107614, // variant ID bb
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107615, // variant ID cc
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107616, // variant ID dd
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107617, // variant ID ee
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107618, // variant ID ff
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107619, // variant ID gg
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107620, // variant ID hh
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107621, // variant ID ii
            price: 1499,
            is_enabled: true,
          },
          {
            id: 107622, // variant ID jj
            price: 1499,
            is_enabled: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [
              107587, // variant ID a
              107588, // variant ID b
              107589, // variant ID c
              107590, // variant ID d
              107591, // variant ID e
              107592, // variant ID f
              107593, // variant ID g
              107594, // variant ID h
              107595, // variant ID i
              107605, // variant ID s
              107606, // variant ID t
              107607, // variant ID u
              107608, // variant ID v
              107609, // variant ID w
              107610, // variant ID x
              107611, // variant ID y
              107612, // variant ID z
              107613, // variant ID aa
            ], // 12oz variant
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: blackImageId_1, // Image ID for black variant
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
            variant_ids: [
              107596, // variant ID j
              107597, // variant ID k
              107598, // variant ID l
              107599, // variant ID m
              107600, // variant ID n
              107601, // variant ID o
              107602, // variant ID p
              107603, // variant ID q
              107604, // variant ID r
              107614, // variant ID bb
              107615, // variant ID cc
              107616, // variant ID dd
              107617, // variant ID ee
              107618, // variant ID ff
              107619, // variant ID gg
              107620, // variant ID hh
              107621, // variant ID ii
              107622, // variant ID jj
            ], // 12oz variant
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: blackImageId_2, // Image ID for black variant
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
    console.log(productImage3.src);
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

module.exports = { createCandle };
