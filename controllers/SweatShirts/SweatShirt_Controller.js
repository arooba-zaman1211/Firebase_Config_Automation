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
    const whiteCard = new NymPost(3951, 4919)
      .setNym(req.body.nym)
      .setType(req.body.type)
      .setDefinition(req.body.definition)
      .setNymColor("white")
      .setTypeColor("white")
      .setDefinitionColor("white")
      .setNymFontSize("500px")
      .setTypeFontSize("200px")
      .setDefinitionFontSize("250px")
      .setMarginTop("322px");

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
    const blackCard = new NymPost(3951, 4919)
      .setNym(req.body.nym)
      .setType(req.body.type)
      .setDefinition(req.body.definition)
      .setNymColor("black")
      .setTypeColor("black")
      .setDefinitionColor("black")
      .setNymFontSize("500px")
      .setTypeFontSize("200px")
      .setDefinitionFontSize("250px")
      .setMarginTop("322px");

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
        title: `${req.body.nym} Unisex Heavy Cotton Tee`,
        description:
          "The unisex heavy cotton tee is the basic staple of any wardrobe. It is the foundation upon which casual fashion grows. All it needs is a personalized design to elevate things to profitability. The specially spun fibers provide a smooth surface for premium printing vividity and sharpness. No side seams mean there are no itchy interruptions under the arms. The shoulders have tape for improved durability.<div>.:Made with medium fabric (5.3 oz/yd² (180 g/m²)) consisting of 100% cotton for year-round comfort that is sustainable and highly durable. </div><br /><div>.:The classic fit of this shirt ensures a comfy, relaxed wear while the crew neckline adds that neat, timeless look that can blend into any occasion, casual or semi-formal.</div><br /><div>.:The tear-away label means a scratch-free experience with no irritation or discomfort whatsoever.</div><br /><div>.:Made using 100% US cotton that is ethically grown and harvested. Gildan is also a proud member of the US Cotton Trust Protocol ensuring ethical and sustainable means of production. This blank tee is certified by Oeko-Tex for safety and quality assurance.</div>",
        blueprint_id: 6,
        print_provider_id: 29,
        variants: [
          {
            id: 11974, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 11975, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 11976, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 11977, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 11978, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 11979, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12070, // Sport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12071, // Sport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12072, // Sport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12073, // Sport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12074, // Sport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12075, // Sport Grey
            price: 2000,
            is_enabled: true,
          },

          {
            id: 12124, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12125, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12126, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12127, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12128, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12129, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12190, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12191, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12192, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12193, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12194, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 12195, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 23989, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24021, // Sport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24039, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24060, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24122, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24153, // Sport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24171, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24194, // Military Green
            price: 2000,
            is_enabled: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [
              12070, 12071, 12072, 12073, 12074, 12075, 24021, 24153,
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
    const whiteImageUrl = getImageUrlForColor(
      productResponse.data,
      "Sport Grey"
    );

    // 6. Post the product image to Instagram
    if (whiteImageUrl) {
      await postToInsta({
        caption: `Check out our new Asphalt T-Shirt! #CustomTshirt #Printify`,
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
