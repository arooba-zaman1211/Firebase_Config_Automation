import { Font } from "canvacord";
import { GreetingsCard } from "./GreetingsCard.js";
import fs from 'fs';

// load font, in this case we are loading the bundled font from canvacord
Font.loadDefault();

// create card
const card = new GreetingsCard()
  .setAvatar("https://cdn.discordapp.com/embed/avatars/0.png")
  .setDisplayName("Wumpus")
  .setType("welcome")
  .setMessage("Welcome to the server!");

const image = await card.build({ format: "png" });

// now do something with the image buffer
fs.writeFileSync('greeting_card.png', image);
console.log('Image saved as greeting_card.png');