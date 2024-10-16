const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");
const { createCanvas } = require("canvas");

// Load fonts from file
Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);

class NymPost extends Builder {
  constructor({
    width = 3505, // Width from your provided data
    height = 3989, // Height from your provided data
    nymFontSize = "570px", // Font size for Nym text
    nymLineHeight = "662.91px", // Line height for Nym text
    Nym = "", // The Nym text
    NymColor = "#000000", // Default text color
    formatNym = false, // Whether to format Nym to uppercase
    top = 245, // Top position from your provided data
    left = 223, // Left position from your provided data
    nymWidth = 3505, // Match width for Nym text
    nymHeight = 3989, // Match height for Nym text
  } = {}) {
    super(width, height);
    this.bootstrap({
      Nym,
      NymColor,
      nymFontSize,
    });

    this.styles = {
      width,
      height,
      nymFontSize,
      nymLineHeight,
      formatNym,
      nymWidth,
      nymHeight,
      top, // Include top and left in the styles
      left,
    };
  }

  setNym(value) {
    this.options.set("Nym", value);
    return this;
  }

  async render() {
    const { Nym, NymColor } = this.options.getOptions();
    const {
      width,
      height,
      nymFontSize,
      nymLineHeight,
      formatNym,
      nymWidth,
      nymHeight,
      top,
      left,
    } = this.styles;

    // Create a canvas to measure text dimensions
    const canvas = createCanvas(1, 1);
    const context = canvas.getContext("2d");

    // Set the font to measure the text
    context.font = `${nymFontSize} BubbleGum`;

    // Measure the text dimensions
    const measuredTextWidth = context.measureText(Nym.toUpperCase()).width;
    const measuredTextHeight = parseFloat(nymLineHeight);

    // Check if the Nym text fits within the available width
    const isNymTextFitting = measuredTextWidth < nymWidth;

    // Adjust final font size if needed
    const finalNymFontSize = isNymTextFitting
      ? nymFontSize
      : `${(nymWidth / measuredTextWidth) * parseFloat(nymFontSize)}px`;
    const finalNymLineHeight = `${
      parseFloat(finalNymFontSize) *
      (parseFloat(nymLineHeight) / parseFloat(nymFontSize))
    }px`;

    // Format Nym text to uppercase if needed
    const formattedNym = formatNym ? Nym.toUpperCase() : Nym;

    return JSX.createElement(
      "div",
      {
        style: {
          width: `${width}px`,
          height: `${height}px`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        },
      },
      // Nym Text
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: finalNymFontSize,
            fontFamily: "BubbleGum",
            color: NymColor,
            lineHeight: finalNymLineHeight,
            whiteSpace: "pre-wrap",
            width: `${nymWidth}px`,
            height: `${nymHeight}px`,
            margin: 0,
            position: "absolute",
            top: `${top}px`, // From your provided data
            left: `${left}px`, // From your provided data
            textTransform: "uppercase",
            textAlign: "center", // Ensure text is centered within the bounding box
          },
        },
        formattedNym
      )
    );
  }
}

module.exports = { NymPost };
