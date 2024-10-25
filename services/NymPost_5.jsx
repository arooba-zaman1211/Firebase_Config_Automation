// Mug 2, 3
const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");
const { createCanvas } = require("canvas");

// Load fonts from file
Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);

class NymPostfive extends Builder {
  constructor({
    width = 2475, // Default outer container width
    height = 1155, // Default outer container height
    nymFontSize = "160px", // Default font size for Nym text
    nymLineHeight = "155px", // Default line height for Nym text
    Nym = "HI, I'M NAT",
    NymColor = "#000000",
    formatNym = false, // Add this default parameter
    top = 470, // Top position for the text
    left = 76, // Left position for the text
    nymWidth = 920, // Width for Nym text
    nymHeight = 182, // Height for Nym text
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
      top,
      left,
      nymWidth,
      nymHeight,
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
      top,
      left,
      nymWidth,
      nymHeight,
    } = this.styles;

    // Fixed width for text wrapping
    const fixedTextWidth = 960; // Set text wrapping width to 960px
    const innerBorderHeight = height - 120; // Inner height remains dynamic

    // Parse font size and line height
    const nymFontSizeNum = parseFloat(nymFontSize);
    const nymLineHeightNum = parseFloat(nymLineHeight);

    // Calculate a potential font size based on the fixed text width
    const lineHeightRatio = nymLineHeightNum / nymFontSizeNum;
    const calculatedNymFontSize = `${
      Math.min(fixedTextWidth, innerBorderHeight) * 0.15
    }px`; // Adjust multiplier for scaling
    const calculatedNymLineHeight = `${
      parseFloat(calculatedNymFontSize) * lineHeightRatio
    }px`;

    // Create a canvas to measure text dimensions
    const canvas = createCanvas(1, 1); // Create a blank canvas
    const context = canvas.getContext("2d");

    // Set the font to measure the text
    context.font = `${nymFontSize} BubbleGum`; // Initial font size
    const measuredTextWidth = context.measureText(Nym.toUpperCase()).width;

    // Measure height based on the potential font size
    context.font = calculatedNymFontSize; // Use calculated font size
    const measuredTextHeight =
      parseFloat(calculatedNymFontSize) * lineHeightRatio;

    // Check if the Nym text fits within the available width and height
    const isNymTextFitting =
      measuredTextWidth < fixedTextWidth &&
      measuredTextHeight < innerBorderHeight;

    // Set the final font size based on whether it fits
    const finalNymFontSize = isNymTextFitting
      ? nymFontSize
      : calculatedNymFontSize;
    const finalNymLineHeight = isNymTextFitting
      ? nymLineHeight
      : calculatedNymLineHeight;

    console.log("Final Font Size:", finalNymFontSize);
    console.log("Final Line Height:", finalNymLineHeight);

    // Format Nym text to uppercase
    const formattedNym = formatNym ? Nym.toUpperCase() : Nym;

    // Calculate vertical centering
    const verticalCenterOffset = (nymHeight - measuredTextHeight) / 2; // Calculate the offset for vertical centering

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
      // Middle Text (Nym Text)
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: finalNymFontSize,
            fontFamily: "BubbleGum",
            color: NymColor,
            lineHeight: finalNymLineHeight,
            whiteSpace: "pre-wrap", // Enable line breaks
            width: `${nymWidth}px`, // Fixed width for wrapping text
            height: `${nymHeight}px`, // Set height for the text element
            margin: 0, // Remove default margins
            textTransform: formatNym ? "uppercase" : "none",
            position: "absolute", // Positioning based on top and left
            top: `${top + verticalCenterOffset}px`, // Adjust top for vertical centering
            left: `${left}px`,
            alignItems: "center",
          },
        },
        formattedNym // Text with line breaks if formatting is enabled
      )
    );
  }
}

module.exports = { NymPostfive };
