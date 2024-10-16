// Mug 1
const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");
const { createCanvas } = require("canvas");

// Load fonts from file
Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);
Font.fromFileSync("public/assets/fonts/Raleway/Raleway-Regular.ttf", "Raleway");

class NymPostsix extends Builder {
  constructor({
    width = 2475, // Default outer container width
    height = 1155, // Default outer container height
    nymFontSize = "160px", // Default font size for Nym text
    nymLineHeight = "155px", // Default line height for Nym text
    definitionFontSize = "70px", // Default font size for Definition text
    definitionLineHeight = "75px", // Default line height for Definition text
    Nym = "HI, I'M NAT",
    Definition = "Short for Natural Disaster",
    NymColor = "#000000",
    formatNym = false, // Add this default parameter
    top = 470, // Top position for the Nym text
    definitionTop = 640, // Top position for the Definition text
    left = 76, // Left position for the text
    nymWidth = 920, // Width for Nym text
    definitionWidth = 920, // Width for Definition text
    nymHeight = 182, // Height for Nym text
    definitionHeight = 60, // Height for Definition text
    distanceBetweenTexts = 20, // Distance between Nym and Definition
  } = {}) {
    super(width, height);
    this.bootstrap({
      Nym,
      Definition,
      NymColor,
      nymFontSize,
      definitionFontSize,
    });

    this.styles = {
      width,
      height,
      nymFontSize,
      nymLineHeight,
      definitionFontSize,
      definitionLineHeight,
      formatNym,
      top,
      left,
      nymWidth,
      nymHeight,
      definitionWidth,
      definitionHeight,
      distanceBetweenTexts, // Store the distance
    };
  }

  async render() {
    const { Nym, Definition, NymColor } = this.options.getOptions();
    const {
      width,
      height,
      nymFontSize,
      nymLineHeight,
      definitionFontSize,
      definitionLineHeight,
      formatNym,
      top,
      left,
      nymWidth,
      definitionWidth,
      definitionHeight,
      distanceBetweenTexts,
      nymHeight,
    } = this.styles;

    // Create a canvas to measure text dimensions
    const canvas = createCanvas(1, 1); // Create a blank canvas
    const context = canvas.getContext("2d");

    // Function to get the adjusted font size for Nym text
    const getAdjustedFontSize = (text, baseFontSize, widthLimit) => {
      context.font = `${baseFontSize} BubbleGum`;
      let measuredTextWidth = context.measureText(text).width;

      // If the text is too wide, decrease the font size until it fits
      let currentFontSize = parseFloat(baseFontSize);
      while (measuredTextWidth > widthLimit) {
        currentFontSize -= 1; // Decrease font size by 1px
        context.font = `${currentFontSize}px BubbleGum`;
        measuredTextWidth = context.measureText(text).width;
      }
      return `${currentFontSize}px`;
    };

    const adjustedNymFontSize = getAdjustedFontSize(
      Nym.toUpperCase(),
      nymFontSize,
      nymWidth
    );

    // Calculate the height of the Nym text based on the adjusted font size and line height
    const adjustedNymHeight = Math.ceil(parseFloat(adjustedNymFontSize) * 1.15); // Adjusting for line height

    // Calculate the top position for Definition text based on Nym's adjusted height and fixed distance
    const adjustedDefinitionTop =
      top + adjustedNymHeight + distanceBetweenTexts;

    const adjustedDefinitionFontSize = getAdjustedFontSize(
      Definition,
      definitionFontSize,
      definitionWidth
    );

    // Calculate line heights
    const adjustedNymLineHeight = `${parseFloat(adjustedNymFontSize) * 1.15}px`;
    const adjustedDefinitionLineHeight = `${
      parseFloat(adjustedDefinitionFontSize) * 1.15
    }px`;

    // Format Nym text to uppercase
    const formattedNym = formatNym ? Nym.toUpperCase() : Nym;

    return JSX.createElement(
      "div",
      {
        style: {
          position: "relative",
          width: `${width}px`,
          height: `${height}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "10px",
        },
      },
      // Nym Text
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: adjustedNymFontSize,
            fontFamily: "BubbleGum",
            color: NymColor,
            lineHeight: adjustedNymLineHeight,
            width: `${nymWidth}px`,
            height: `${nymHeight}px`,
            margin: 0, // Remove default margins
            position: "absolute", // Positioning based on top and left
            top: `${top}px`,
            left: `${left}px`,
          },
        },
        formattedNym
      ),
      // Definition Text
      JSX.createElement(
        "p",
        {
          style: {
            fontSize: adjustedDefinitionFontSize,
            fontFamily: "Raleway",
            color: NymColor,
            lineHeight: adjustedDefinitionLineHeight,
            width: `${definitionWidth}px`,
            height: `${definitionHeight}px`,
            margin: 0, // Remove default margins
            position: "absolute", // Positioning based on top and left
            top: `${adjustedDefinitionTop}px`, // Use adjusted top position
            left: `${left}px`,
            whiteSpace: "pre-wrap",
          },
        },
        Definition
      )
    );
  }
}

module.exports = { NymPostsix };
