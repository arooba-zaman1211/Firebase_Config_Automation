const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { Font } = require("canvacord");
const { NymPost } = require("../../services/NymPost.jsx"); // Import your NymPost class
require("dotenv").config();
const { IgApiClient } = require("instagram-private-api");
const { get } = require("request-promise");

const token = process.env.PRINTIFY_ACCESS_TOKEN;
const shopId = process.env.PRINTIFY_SHOP_ID;
const IG_username = process.env.IG_USERNAME;
const IG_password = process.env.IG_PASSWORD;

Font.fromFileSync("public/assets/fonts/Cardo/Cardo-Bold.ttf", "Cardo-Bold");
Font.fromFileSync("public/assets/fonts/Inter/Inter-Italic.ttf", "Inter-Italic");
Font.fromFileSync(
  "public/assets/fonts/Inter/Inter-Regular.ttf",
  "Inter-Regular"
);

// Helper function to read a file and convert it to Base64
const getBase64FromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString("base64"));
      }
    });
  });
};

// Helper function to generate a unique file name
const generateUniqueFileName = () => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  return `nym_post_${timestamp}.png`;
};

// Function to post to Instagram
const postToInsta = async ({ caption, image_url }) => {
  try {
    const ig = new IgApiClient();
    ig.state.generateDevice(IG_username);

    // Login
    await ig.account.login(IG_username, IG_password);

    // Get the image as a buffer
    const imageBuffer = await get({
      url: image_url,
      encoding: null, // Ensures the image is returned as a buffer
    });

    // Publish the photo with caption
    const publishResponse = await ig.publish.photo({
      file: imageBuffer,
      caption: caption,
    });

    console.log("Instagram publish response:", publishResponse);

    return publishResponse.data;
  } catch (error) {
    console.error("Error posting to Instagram:", error);
    throw error;
  }
};

// Helper function to get the image URL for a specific color
const getImageUrlForColor = (productData, colorTitle) => {
  // Find the color option
  const colorOption = productData.options.find(
    (option) => option.name === "Colors"
  );
  if (!colorOption) return null;

  console.log("Colors we have: ", colorOption);

  // Find the color value with the specified title
  const color = colorOption.values.find((c) => c.title === colorTitle);
  if (!color) return null;
  console.log("id of Color we want: ", color);

  // Extract the color's ID
  const colorId = color.id;

  // Find the variant with the specified color ID
  const variant = productData.variants.find((v) => v.options.includes(colorId));
  console.log("Variant having that id : ", variant);

  if (!variant) return null;

  // Find an image URL where any variant_id matches the variant's ID
  const image = productData.images.find((image) =>
    image.variant_ids.includes(variant.id)
  );

  console.log("Colors url: ", image);

  return image ? image.src : null;
};

// Controller function to generate and upload image
const createAndUploadImage = async (req, res) => {
  try {
    // 1. Generate the image using Canvacord and save it locally
    const card = new NymPost()
      .setNym(req.body.nym)
      .setType(req.body.type)
      .setDefinition(req.body.definition);

    const image = await card.build({ format: "png" });
    const fileName = generateUniqueFileName();
    const filePath = path.join(__dirname, "../../public/images", fileName);

    // Save the image to the file system
    fs.writeFileSync(filePath, image);

    // 2. Convert the saved image to Base64 format
    const base64Image = await getBase64FromFile(filePath);

    // 3. Upload the Base64-encoded image to Printify
    const uploadResponse = await axios.post(
      "https://api.printify.com/v1/uploads/images.json",
      {
        file_name: fileName,
        contents: base64Image,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Get the uploaded image ID
    const imageId = uploadResponse.data.id;

    // 4. Create a product in Printify
    const productResponse = await axios.post(
      `https://api.printify.com/v1/shops/${shopId}/products.json`,
      {
        title: "Custom T-Shirt",
        description: "A high-quality custom t-shirt with your design.",
        blueprint_id: 41,
        print_provider_id: 3,
        variants: [
          {
            id: 24986,
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24988,
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24990,
            price: 2000,
            is_enabled: true,
          },
          {
            id: 24991,
            price: 2000,
            is_enabled: true,
          },
        ],
        print_areas: [
          {
            variant_ids: [24986, 24988, 24990, 24991],
            placeholders: [
              {
                position: "front",
                images: [
                  {
                    id: imageId, // Use the uploaded image ID here
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
    const whiteImageUrl = getImageUrlForColor(productResponse.data, "Asphalt");

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
