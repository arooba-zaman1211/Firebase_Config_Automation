//Candle 2, 3
const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");
const { createCanvas } = require("canvas");

// Load fonts from file
Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);
Font.fromFileSync("public/assets/fonts/Raleway/Raleway-Regular.ttf", "Raleway");

class NymPostthree extends Builder {
  constructor({
    width = 645, // Default outer container width
    height = 546, // Default outer container height
    innerBorderWidth = 458,
    innerBorderHeight = 400,
    innerBorderTop = 73,
    innerBorderLeft = 93,
    nymWidth = 359,
    nymHeight = 250,
    nymTop = 148,
    nymLeft = 133,
    nymFontSize = "5vw", // Use vw for responsiveness
    nymLineHeight = "5.5vw", // Adjusted for responsiveness
    bottomTextWidth = 252,
    bottomTextHeight = 32,
    bottomTextTop = 350,
    bottomTextLeft = 186,
    bottomFontSize = "2vw", // Responsive font size for bottom text
    bottomLineHeight = "2.2vw", // Line height responsive
    Nym = "",
    BottomText = "Soy Wax Candle \n 4 oz / 20+ hours",
    NymColor = "#000000",
    formatNym = false, // Add this default parameter
  } = {}) {
    super(width, height); // Pass outer dimensions to the parent Builder class
    this.bootstrap({
      Nym,
      BottomText,
      NymColor,
      nymFontSize,
      bottomFontSize,
    });

    this.backgroundImage = null;
    this.backgroundImageLoaded = false;

    this.styles = {
      width,
      height,
      innerBorderWidth,
      innerBorderHeight,
      innerBorderTop,
      innerBorderLeft,
      nymWidth,
      nymHeight,
      nymTop,
      nymLeft,
      nymFontSize,
      nymLineHeight,
      bottomTextWidth,
      bottomTextHeight,
      bottomTextTop,
      bottomTextLeft,
      bottomFontSize,
      bottomLineHeight,
      formatNym,
    };
  }

  setNym(value) {
    this.options.set("Nym", value);
    return this;
  }

  setBottomText(value) {
    this.options.set("BottomText", value);
    return this;
  }

  async render() {
    const { Nym, BottomText, NymColor } = this.options.getOptions();
    const {
      width,
      height,
      innerBorderWidth,
      innerBorderHeight,
      innerBorderTop,
      innerBorderLeft,
      nymWidth,
      nymLineHeight,
      nymHeight,
      nymFontSize, // Pass the original nymFontSize for reference
      bottomTextWidth,
      bottomTextHeight,
      bottomTextTop,
      bottomTextLeft,
      bottomLineHeight,
      bottomFontSize,
      formatNym,
    } = this.styles;

    // Adjusted dimensions (100 less than the inner border)

    const newWidth = innerBorderWidth - 120;
    const newHeight = innerBorderHeight - 120;

    const nymFontSizeNum = parseFloat(nymFontSize);
    const nymLineHeightNum = parseFloat(nymLineHeight);

    const lineHeightRatio = nymLineHeightNum / nymFontSizeNum;
    // Dynamically calculate the font size based on container size
    const calculatedNymFontSize = `${Math.min(newWidth, newHeight) * 0.15}px`; // Adjust the multiplier for scaling
    const calculatedNymLineHeight = `${
      parseFloat(calculatedNymFontSize) * lineHeightRatio
    }px`;

    // Create a canvas to measure text dimensions
    const canvas = createCanvas(1, 1); // Create a blank canvas
    const context = canvas.getContext("2d");

    // Set the font to measure the text
    context.font = `${nymFontSize} BubbleGum`; // Adjust the font name as needed
    const measuredTextWidth = context.measureText(Nym.toUpperCase()).width;

    // Check if the Nym text fits within the available width and height
    const isNymTextFitting =
      measuredTextWidth < newWidth && parseFloat(nymFontSize) < newHeight;

    // Set the final font size based on whether it fits
    const finalNymFontSize = isNymTextFitting
      ? nymFontSize
      : calculatedNymFontSize;
    const finalNymLineHeight = isNymTextFitting
      ? nymLineHeight
      : calculatedNymLineHeight;

    console.log("Line height:", finalNymLineHeight);

    // Format Nym text to uppercase
    const formattedNym = formatNym ? Nym.toUpperCase() : Nym;

    return JSX.createElement(
      "div",
      {
        style: {
          position: "relative",
          width: `${width}px`,
          height: `${height}px`,
          border: "1px solid #000",
          display: "flex",
        },
      },
      // Inner boundary
      JSX.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            width: `${innerBorderWidth}px`,
            height: `${innerBorderHeight}px`,
            border: "2px solid #000",
            position: "absolute",
            top: `${innerBorderTop}px`,
            left: `${innerBorderLeft}px`,
            alignItems: "center",
            justifyContent: "center", // Ensure vertical centering for Nym text
          },
        },
        // Middle Text (Nym Text) centered both vertically and horizontally
        JSX.createElement(
          "h1",
          {
            style: {
              fontSize: finalNymFontSize,
              fontFamily: "BubbleGum",
              color: NymColor,
              lineHeight: finalNymLineHeight,
              textAlign: "center",
              whiteSpace: "pre-wrap", // Enable line breaks
              width: `${nymWidth}px`,
              display: "flex",
              justifyContent: "center", // Horizontal centering
              alignItems: "center",
              flexDirection: "column", // Stack lines in a column
              textTransform: formatNym ? "uppercase" : "none", // Ensure text is capitalized
            },
          },
          formattedNym // Text with line breaks if formatting is enabled
        )
      ),
      // Bottom Text - Fixed in position regardless of Nym text
      JSX.createElement(
        "p",
        {
          style: {
            position: "absolute", // Maintain absolute positioning
            fontSize: bottomFontSize,
            fontFamily: "Raleway",
            color: NymColor,
            lineHeight: bottomLineHeight,
            textAlign: "center",
            width: `${bottomTextWidth}px`,
            bottom: "90px",
            left: "50%",
            transform: "translate(-30%, 0)",
            whiteSpace: "pre-wrap",
            margin: 0,
          },
        },
        BottomText
      )
    );
  }
}

module.exports = { NymPostthree };
