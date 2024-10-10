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
        title: `Unisex Softstyle T-Shirt`,
        description: `<div>
          <h2>Unisex Soft-Style T-Shirt</h2>
          <p>The unisex soft-style t-shirt puts a new spin on casual comfort. Made from very soft materials, this tee is 100% cotton for solid colors. Heather colors and sports grey include polyester. The shoulders have twill tape for improved durability. There are no side seams. The collar is made with ribbed knitting to prevent curling damage.</p>
          
          <ul>
            <li><strong>Material:</strong> 100% ring-spun cotton (solid colors); Heather colors and Sports Grey include polyester</li>
            <li><strong>Weight:</strong> Lightweight fabric (4.5 oz/yd² or 153 g/m²)</li>
            <li><strong>Fit:</strong> Classic fit with crew neckline</li>
            <li><strong>Label:</strong> Pearlized, tear-away label for total wearing comfort</li>
            <li><strong>Ethical sourcing:</strong> Made using ethically grown and harvested US cotton</li>
            <li><strong>Certifications:</strong> Certified by Oeko-Tex for safety and quality assurance</li>
            <li><strong>Fabric blends:</strong> Heather colors - 35% ring-spun cotton, 65% polyester; Sport Grey and Antique colors - 90% cotton, 10% polyester; Graphite Heather - 50% ring-spun cotton, 50% polyester</li>
          </ul>

          <h3>Size Chart:</h3>
          <div style="overflow-x:auto;">
            <table style="border-collapse: collapse; width: 100%; text-align: left; min-width: 600px;">
              <thead>
                <tr>
                  <th style="border: 1px solid #ddd; padding: 8px;">Size</th>
                  <th style="border: 1px solid #ddd; padding: 8px;">XS</th>
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
                  <td style="border: 1px solid #ddd; padding: 8px;">16.00</td>
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
                  <td style="border: 1px solid #ddd; padding: 8px;">27.00</td>
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
                  <td style="border: 1px solid #ddd; padding: 8px;">Sleeve length, in</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">7.99</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">8.23</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">8.50</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">8.74</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">9.02</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">9.25</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">9.49</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">9.72</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">9.96</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">Size tolerance, in</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">1.50</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">1.50</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">1.50</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">1.50</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">1.50</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">1.50</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">1.50</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">1.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`,
        blueprint_id: 145,
        print_provider_id: 99,
        tags: ["whimnym"],
        is_printify_express_enabled: true,
        variants: [
          // Dark Chocolate Variants
          {
            id: 38155, // Dark Chocolate S
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38169, // Dark Chocolate M
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38183, // Dark Chocolate L
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38197, // Dark Chocolate XL
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42112, // Dark Chocolate 3XL
            price: 2050,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38211, // Dark Chocolate 2XL
            price: 1850,
            is_enabled: true,
            is_printify_express_eligible: true,
          },

          // White Variants
          {
            id: 38205, // White XL
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38163, // White S
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38191, // White L
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38177, // White M
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 67829, // White XS
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 66211, // White 4XL
            price: 2300,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42120, // White 3XL
            price: 2050,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38219, // White 2XL
            price: 1850,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 95175, // White 5XL
            price: 2450,
            is_enabled: true,
            is_printify_express_eligible: true,
          },

          // Sport Grey Variants
          {
            id: 38204, // Sport Grey XL
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38162, // Sport Grey S
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38190, // Sport Grey L
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38176, // Sport Grey M
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 67827, // Sport Grey XS
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 66210, // Sport Grey 4XL
            price: 2300,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42119, // Sport Grey 3XL
            price: 2050,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38218, // Sport Grey 2XL
            price: 1850,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 95176, // Sport Grey 5XL
            price: 2450,
            is_enabled: true,
            is_printify_express_eligible: true,
          },

          // Cardinal Red Variants
          {
            id: 42815, // Cardinal Red XL
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42812, // Cardinal Red S
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42814, // Cardinal Red L
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42813, // Cardinal Red M
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 66214, // Cardinal Red 4XL
            price: 2300,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42817, // Cardinal Red 3XL
            price: 2050,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42816, // Cardinal Red 2XL
            price: 1850,
            is_enabled: true,
            is_printify_express_eligible: true,
          },

          // Heather Navy Variants
          {
            id: 42830, // Heather Navy L
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42818, // Heather Navy S
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42824, // Heather Navy M
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42836, // Heather Navy XL
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 67809, // Heather Navy XS
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 66193, // Heather Navy 4XL
            price: 2300,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42848, // Heather Navy 3XL
            price: 2050,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42842, // Heather Navy 2XL
            price: 1850,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 95152, // Heather Navy 5XL
            price: 2450,
            is_enabled: true,
            is_printify_express_eligible: true,
          },

          // Black Variants
          {
            id: 38206, // Black XL
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38192, // Black L
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38178, // Black M
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38164, // Black S
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 67831, // Black XS
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 66213, // Black 4XL
            price: 2300,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 42122, // Black 3XL
            price: 2050,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 38220, // Black 2XL
            price: 1850,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 95180, // Black 5XL
            price: 2450,
            is_enabled: true,
            is_printify_express_eligible: true,
          },

          // Maroon Variants
          {
            id: 63307, // Maroon XL
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 63297, // Maroon M
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 63292, // Maroon S
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 63302, // Maroon L
            price: 1600,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 63317, // Maroon 3XL
            price: 2050,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
          {
            id: 63312, // Maroon 2XL
            price: 1850,
            is_enabled: true,
            is_printify_express_eligible: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [
              38205, // White XL
              38163, // White S
              38191, // White L
              38177, // White M
              67829, // White XS
              66211, // White 4XL
              42120, // White 3XL
              38219, // White 2XL
              95175, // White 5XL
              38204, // Sport Grey XL
              38162, // Sport Grey S
              38190, // Sport Grey L
              38176, // Sport Grey M
              67827, // Sport Grey XS
              66210, // Sport Grey 4XL
              42119, // Sport Grey 3XL
              38218, // Sport Grey 2XL
              95176, // Sport Grey 5XL
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
              38155, // Dark Chocolate S
              38169, // Dark Chocolate M
              38183, // Dark Chocolate L
              38197, // Dark Chocolate XL
              42112, // Dark Chocolate 3XL
              38211, // Dark Chocolate 2XL
              42830, // Heather Navy L
              42818, // Heather Navy S
              42824, // Heather Navy M
              42836, // Heather Navy XL
              67809, // Heather Navy XS
              66193, // Heather Navy 4XL
              42848, // Heather Navy 3XL
              42842, // Heather Navy 2XL
              95152, // Heather Navy 5XL
              42815, // Cardinal Red XL
              42812, // Cardinal Red S
              42814, // Cardinal Red L
              42813, // Cardinal Red M
              66214, // Cardinal Red 4XL
              42817, // Cardinal Red 3XL
              42816, // Cardinal Red 2XL
              63307, // Maroon XL
              63297, // Maroon M
              63292, // Maroon S
              63302, // Maroon L
              63317, // Maroon 3XL
              63312, // Maroon 2XL
              38206, // Black XL
              38192, // Black L
              38178, // Black M
              38164, // Black S
              67831, // Black XS
              66213, // Black 4XL
              42122, // Black 3XL
              38220, // Black 2XL
              95180, // Black 5XL
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

    console.log("Product id:", productId);
    const data = await publishData(productId);

    if (data) {
      console.log("Product published to Shopify");
      const whiteImageUrl = getImageUrlForColor(productResponse.data);
      console.log("Shirt url:", whiteImageUrl);
      return whiteImageUrl;
    } else {
      return;
    }
  } catch (error) {
    return error;
  }
};

module.exports = { createTShirt };
