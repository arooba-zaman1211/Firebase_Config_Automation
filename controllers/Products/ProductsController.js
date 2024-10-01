require("dotenv").config();
const { postToInsta } = require("../../helper/Helper.js");
const { createTShirt } = require("../../helper/TshirtHelper.js");
const { createHoodie } = require("../../helper/Hoodiehelper.js");
const { createMug } = require("../../helper/Mughelper.js");

const createAndUploadImage = async (req, res) => {
  try {
    const name = req.body.nym;
    const type = req.body.type;
    const definition = req.body.definition;

    const tshirt = await createTShirt(name, type, definition);
    const hoodie = await createHoodie(name, type, definition);
    const mug = await createMug(name, type, definition);

    console.log("Tshirt url: ", tshirt);
    console.log("Hoodie url: ", hoodie);
    console.log("Mug url: ", mug);

    if (!tshirt || !hoodie || !mug) {
      res.status(400).send("Error creating and uploading image or product");
    }
    const images_url = [tshirt, hoodie, mug];
    await postToInsta({
      caption: `Check out our new Products! #CustomTshirt #Printify`,
      image_urls: images_url,
    });
    res.status(200).json(postToInsta);
  } catch (error) {
    res.status(500).send("Error creating and uploading image or product");
  }
};

module.exports = { createAndUploadImage };