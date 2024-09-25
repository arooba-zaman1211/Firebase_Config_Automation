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
        title: `${req.body.nym} Unisex Heavy Blend™ Hooded Sweatshirt`,
        description:
          "This unisex heavy blend hooded sweatshirt is relaxation itself. Made with a thick blend of cotton and polyester, it feels plush, soft and warm, a perfect choice for any cold day. In the front, the spacious kangaroo pocket adds daily practicality while the hood's drawstring is the same color as the base sweater for extra style points.<div>.:Made with a medium-heavy fabric (8.0 oz/yd² (271 g/m²)) that consists of 50% cotton and 50% polyester for that cozy feel and warmth you need in a hoodie.</div><div>.:The classic fit along with the pouch pocket and the tear-away label make for a highly comfortable, scratch-free wearing experience. </div><div>.:The color-matched drawcord and the double-lined hood add a stylish flair and durability that tie everything together.</div><div>.:Made using 100% ethically grown US cotton. Gildan is also a proud member of the US Cotton Trust Protocol ensuring ethical and sustainable means of production. The blank tee's dyes are OEKO-TEX-certified dyes with low environmental impact.</div><div>.:Fabric blends: Heather Sport colors - 60% polyester, 40% cotton</div>",
        blueprint_id: 77,
        print_provider_id: 29,
        variants: [
          {
            id: 32886, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32887, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32888, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32889, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32890, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32891, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32892, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32893, // Maroon
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32902, // SSport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32903, // SSport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32904, // SSport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32905, // SSport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32906, // SSport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32907, // SSport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32908, // SSport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32909, // SSport Grey
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32918, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32919, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32920, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32921, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32922, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32923, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32924, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 32925, // Black
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33425, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33426, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33427, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33428, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33429, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33430, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33431, // Military Green
            price: 2000,
            is_enabled: true,
          },
          {
            id: 33432, // Military Green
            price: 2000,
            is_enabled: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [
              32902, 32903, 32904, 32905, 32906, 32907, 32908, 32909,
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
              32886, 32887, 32888, 32889, 32890, 32891, 32892, 32893, 32918,
              32919, 32920, 32921, 32922, 32923, 32924, 32925, 33425, 33426,
              33427, 33428, 33429, 33430, 33431, 33432,
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
