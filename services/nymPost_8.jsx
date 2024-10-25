const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");
const { createCanvas } = require("canvas");

// Load fonts from file
Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);

class NymPosteight extends Builder {
  constructor({
    width = 3852, // Width from your provided data
    height = 4398, // Height from your provided data
    nymFontSize = "570px", // Font size for Nym text
    nymLineHeight = "662.91px", // Line height for Nym text
    Nym = "", // The Nym text
    NymColor = "#000000", // Default text color
    formatNym = false, // Whether to format Nym to uppercase
    top = 245, // Top position from your provided data
    left = 0, // Left position from your provided data
    nymWidth = 3505, // Match width for Nym text
    nymHeight = 3989, // Match height for Nym text
    backgroundImageUrl = null,
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
      backgroundImageUrl,
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
      backgroundImageUrl,
      left,
    } = this.styles;

    const nymFontSizeNum = parseFloat(nymFontSize);
    const nymLineHeightNum = parseFloat(nymLineHeight);
    const lineHeightRatio = nymLineHeightNum / nymFontSizeNum;

    // Dynamically calculate the font size based on container size
    const calculatedNymFontSize = `${Math.min(nymWidth, nymHeight) * 0.15}px`;
    const calculatedNymLineHeight = `${
      parseFloat(calculatedNymFontSize) * lineHeightRatio
    }px`;

    // Create a canvas to measure text dimensions
    const canvas = createCanvas(1, 1);
    const context = canvas.getContext("2d");

    // Set the font to measure the text
    context.font = `${nymFontSize} BubbleGum`;

    const isNymTextFitting = nymFontSizeNum < nymHeight;

    const finalNymFontSize = isNymTextFitting
      ? nymFontSize
      : calculatedNymFontSize;
    console.log("font size", finalNymFontSize);
    const finalNymLineHeight = isNymTextFitting
      ? nymLineHeight
      : calculatedNymLineHeight;

    // Format Nym text to uppercase if needed
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
          backgroundImage: backgroundImageUrl
            ? `url(${backgroundImageUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: finalNymFontSize,
            fontFamily: "BubbleGum",
            color: "#E39751",
            textShadow: `
                5px 5px 0 black, 
                -5px -5px 0 black, 
                5px -5px 0 black, 
                -5px 5px 0 black,
                5px 0 0 black,
                -5px 0 0 black,
                0 5px 0 black,
                0 -5px 0 black
              `,
            lineHeight: finalNymLineHeight,
            width: `${nymWidth}px`,
            position: "absolute",
            marginTop: `${top}px`,
            padding: `0 0 0 ${left}px`,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            textTransform: formatNym ? "uppercase" : "none",
          },
        },
        formattedNym
      )
    );
  }
}

module.exports = { NymPosteight };
