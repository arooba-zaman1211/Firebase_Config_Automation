import { Font } from "canvacord";
import { NymPost } from "./templates/NymPost.js";
import fs from 'fs';

// Load fonts
Font.fromFileSync("assets/fonts/Inter/Inter-Italic.ttf");
Font.fromFileSync("assets/fonts/Cardo/Cardo-Bold.ttf");
Font.fromFileSync("assets/fonts/Inter/Inter-Regular.ttf");

// create post
const card = new NymPost()
  .setNym("Snackccident")
  .setType("noun.")
  .setDefinition("The unintentional consumption of an entire bag of chips in one sitting.");

const image = await card.build({ format: "png" });

fs.writeFileSync('assets/images/nym_post.png', image);