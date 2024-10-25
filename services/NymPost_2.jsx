const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");
const { createCanvas } = require("canvas");

// Load fonts from file
Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);

class NymPosttwo extends Builder {
  constructor({
    width = 3852, // Width of the overall canvas
    height = 4398, // Height of the overall canvas
    nymFontSize = "570px", // Font size for Nym text
    nymLineHeight = "662.91px", // Line height for Nym text
    Nym = "", // The Nym text
    NymColor = "#000000", // Default text color
    formatNym = false, // Whether to format Nym to uppercase
    top = 245, // Top position of Nym text
    left = 223, // Left position of Nym text
    nymWidth = 3505, // Outer border width for Nym text
    nymHeight = 3989, // Outer border height for Nym text
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
      top,
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

    const nymFontSizeNum = parseFloat(nymFontSize);
    const nymLineHeightNum = parseFloat(nymLineHeight);
    const lineHeightRatio = nymLineHeightNum / nymFontSizeNum;

    // Create a canvas context to measure the text
    const canvas = createCanvas(1, 1);
    const context = canvas.getContext("2d");

    // Set the font to measure the text
    context.font = `${nymFontSize} BubbleGum`;
    const measuredTextHeight = nymFontSizeNum; // Use font size as a proxy for text height

    // Only resize if the text exceeds the height, not the width
    const fitsWithinHeight = measuredTextHeight < nymHeight;

    // Keep original size if it fits within the height, otherwise resize
    const finalNymFontSize = fitsWithinHeight
      ? nymFontSize // Keep original size if it fits the height
      : `${nymHeight * 0.9}px`; // Resize based on height (adjust scaling factor as needed)

    const finalNymLineHeight = fitsWithinHeight
      ? nymLineHeight
      : `${parseFloat(finalNymFontSize) * lineHeightRatio}px`;

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
            marginTop: `${top}px`,
            paddingLeft: `0 0 0 ${left}px`,
            textTransform: "none", // No automatic capitalization unless specified
            textAlign: "center", // Ensure text is centered
          },
        },
        formattedNym
      )
    );
  }
}

module.exports = { NymPosttwo };
