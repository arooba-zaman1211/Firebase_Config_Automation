// T-shirt and hoodie design 1
const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");
const { createCanvas } = require("canvas");

// Load fonts from file
Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);
Font.fromFileSync("public/assets/fonts/Raleway/Raleway-Regular.ttf", "Raleway");

class NymPostone extends Builder {
  constructor({
    width = 3852, // Outer border width from your provided data
    height = 4398, // Outer border height from your provided data
    nymFontSize = "540px", // Default font size for Nym text
    nymLineHeight = "628.02px", // Default line height for Nym text
    definitionFontSize = "250px", // Default font size for Definition text
    definitionLineHeight = "293.5px", // Default line height for Definition text
    Nym = "Your Nym Text Here",
    Definition = "Your Definition Text Here",
    NymColor = "#000000",
    formatNym = false, // Whether to format Nym to uppercase
    nymTop = 326, // Top position for Nym text
    definitionTop = 904, // Top position for Definition text
    left = 271, // Left position for both texts
    nymWidth = 3263, // Width for Nym text
    nymHeight = 558, // Height for Nym text
    definitionWidth = 3263, // Width for Definition text
    definitionHeight = 241, // Height for Definition text
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
      nymTop,
      left,
      nymWidth,
      nymHeight,
      definitionWidth,
      definitionHeight,
      distanceBetweenTexts,
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
      nymTop,
      left,
      nymWidth,
      nymHeight,
      definitionWidth,
      definitionHeight,
      distanceBetweenTexts,
    } = this.styles;

    // Create a canvas to measure text dimensions
    const canvas = createCanvas(1, 1);
    const context = canvas.getContext("2d");

    // Function to get the adjusted font size for Nym text
    const getAdjustedFontSize = (
      text,
      baseFontSize,
      widthLimit,
      heightLimit
    ) => {
      context.font = `${baseFontSize} BubbleGum`;
      let measuredTextWidth = context.measureText(text).width;

      // If the text is too wide or too tall, decrease the font size until it fits
      let currentFontSize = parseFloat(baseFontSize);
      while (
        (measuredTextWidth > widthLimit || currentFontSize > heightLimit) &&
        currentFontSize > 0
      ) {
        currentFontSize -= 1; // Decrease font size by 1px
        context.font = `${currentFontSize}px BubbleGum`;
        measuredTextWidth = context.measureText(text).width;
      }
      return `${currentFontSize}px`;
    };

    const adjustedNymFontSize = getAdjustedFontSize(
      Nym.toUpperCase(),
      nymFontSize,
      nymWidth,
      nymHeight
    );

    // Calculate the height of the Nym text based on the adjusted font size and line height
    const adjustedNymHeight = Math.ceil(parseFloat(adjustedNymFontSize) * 1.15);

    // Calculate the top position for Definition text based on Nym's adjusted height and fixed distance
    const adjustedDefinitionTop =
      nymTop + adjustedNymHeight + distanceBetweenTexts;

    const adjustedDefinitionFontSize = getAdjustedFontSize(
      Definition,
      definitionFontSize,
      definitionWidth,
      definitionHeight
    );

    // Calculate line heights
    const adjustedNymLineHeight = `${parseFloat(adjustedNymFontSize) * 1.15}px`;
    const adjustedDefinitionLineHeight = `${
      parseFloat(adjustedDefinitionFontSize) * 1.15
    }px`;

    // Format Nym text to uppercase if specified
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
            margin: 0,
            position: "absolute",
            top: `${nymTop}px`,
            left: `${left}px`,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            textTransform: "uppercase",
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
            margin: 0,
            position: "absolute",
            top: `${adjustedDefinitionTop}px`,
            left: `${left}px`,
            whiteSpace: "pre-wrap",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          },
        },
        Definition
      )
    );
  }
}

module.exports = { NymPostone };
