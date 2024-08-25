import { Font } from "canvacord";
import { NymPost } from "./templates/NymPost.js";
import fs from 'fs';

// Load fonts
Font.fromFileSync("assets/fonts/Cardo/Cardo-Bold.ttf", 'Cardo-Bold');
Font.fromFileSync("assets/fonts/Inter/Inter-Italic.ttf", 'Inter-Italic');
Font.fromFileSync("assets/fonts/Inter/Inter-Regular.ttf", 'Inter-Regular');

// create post
const card = new NymPost()
  .setNym("Snackccident")
  .setType("noun.")
  .setDefinition("The unintentional consumption of an entire bag of chips in one sitting.");

const image = await card.build({ format: "jpeg" });

fs.writeFileSync('assets/images/nym_post.jpeg', image);