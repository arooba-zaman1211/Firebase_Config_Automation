// Candle 1
const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");
const { createCanvas } = require("canvas");
// Load fonts from file
Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);
Font.fromFileSync("public/assets/fonts/Raleway/Raleway-Regular.ttf", "Raleway");

class NymPostfour extends Builder {
  constructor({
    width = 624,
    height = 546,
    innerBorderWidth = 458,
    innerBorderHeight = 400,
    innerBorderTop = 73,
    innerBorderLeft = 83,
    nymWidth = 391,
    nymHeight = 60,
    nymFontSize = "70px",
    nymLineHeight = "81.41px",
    definitionWidth = 391,
    definitionHeight = 19,
    definitionFontSize = "27px",
    definitionLineHeight = "17px",
    bottomTextWidth = 252,
    bottomTextHeight = 32,
    bottomTextTop = 350,
    bottomFontSize = "22px",
    bottomLineHeight = "21px",
    Nym = "HI, I'M NAT",
    Definition = "Short for Natural Disaster",
    BottomText = "Soy Wax Candle \n 4 oz / 20+ hours",
    NymColor = "#000000",
    formatNym = true,
  } = {}) {
    super(width, height);
    this.options.set("Nym", Nym);
    this.options.set("Definition", Definition);
    this.options.set("BottomText", BottomText);
    this.options.set("NymColor", NymColor);
    this.options.set("nymFontSize", nymFontSize);
    this.options.set("bottomFontSize", bottomFontSize);

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
      nymFontSize,
      nymLineHeight,
      definitionWidth,
      definitionHeight,
      definitionFontSize,
      definitionLineHeight,
      bottomTextWidth,
      bottomTextHeight,
      bottomTextTop,
      bottomFontSize,
      bottomLineHeight,
    };

    this.formatNym = formatNym;
  }

  setNym(value) {
    this.options.set("Nym", value);
    return this;
  }

  setDefinition(value) {
    this.options.set("Definition", value);
    return this;
  }

  setBottomText(value) {
    this.options.set("BottomText", value);
    return this;
  }

  async render() {
    const {
      Nym,
      Definition,
      BottomText,
      NymColor,
      nymFontSize,
      bottomFontSize,
    } = this.options.getOptions();

    const {
      width,
      height,
      innerBorderWidth,
      innerBorderHeight,
      innerBorderTop,
      innerBorderLeft,
      nymWidth,
      nymHeight,
      nymLineHeight,
      definitionWidth,
      definitionHeight,
      definitionFontSize,
      definitionLineHeight,
      bottomTextWidth,
      bottomTextHeight,
      bottomTextTop,
      bottomLineHeight,
    } = this.styles;

    // Create a canvas to measure text dimensions
    const canvas = createCanvas(1, 1); // Create a blank canvas
    const context = canvas.getContext("2d");

    // Function to get the adjusted font size
    const getAdjustedFontSize = (text) => {
      context.font = `${nymFontSize} BubbleGum`;
      let measuredTextWidth = context.measureText(text).width;

      // If the text is too wide, decrease the font size until it fits
      let currentFontSize = parseFloat(nymFontSize);
      while (measuredTextWidth > nymWidth) {
        currentFontSize -= 1; // Decrease font size by 1px
        context.font = `${currentFontSize}px BubbleGum`;
        measuredTextWidth = context.measureText(text).width;
      }
      return `${currentFontSize}px`;
    };

    const adjustedNymFontSize = getAdjustedFontSize(Nym);
    const adjustedLineHeight = parseFloat(adjustedNymFontSize) * 1.15; // Set line height as needed

    const formattedNym = this.formatNym ? Nym.split(" ").join("\n") : Nym;

    return JSX.createElement(
      "div",
      {
        style: {
          position: "relative",
          width: `${width}px`,
          height: `${height}px`,
          border: "1px solid #000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
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
            justifyContent: "center", // Centering the contents
            padding: "20px 0", // "20px 0"
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
              lineHeight: `${adjustedLineHeight}px`,
              textAlign: "center",
              whiteSpace: "pre-wrap", // Enable line breaks
              width: `${nymWidth}px`,
              display: "flex",
              justifyContent: "center", // Horizontal centering
              alignItems: "center",
              flexDirection: "column", // Stack lines in a column
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
              fontSize: definitionFontSize,
              fontFamily: "Raleway",
              color: NymColor,
              lineHeight: definitionLineHeight,
              textAlign: "center",
              whiteSpace: "pre-wrap", // Enable line breaks
              width: `${definitionWidth}px`,
              display: "flex",
              justifyContent: "center", // Horizontal centering
              alignItems: "center",
              flexDirection: "column", // Stack lines in a column
              marginTop: "-20px", // Adjust the distance between Nym and Definition if needed
            },
          },
          Definition
        )
      ),
      // Bottom Text
      JSX.createElement(
        "p",
        {
          style: {
            fontSize: bottomFontSize,
            fontFamily: "Raleway",
            color: NymColor,
            lineHeight: bottomLineHeight,
            textAlign: "center",
            width: `${bottomTextWidth}px`,
            marginTop: `${bottomTextTop}px`,
            height: `${bottomTextHeight}px`,
            whiteSpace: "pre-wrap",
            justifyContent: "center",
          },
        },
        BottomText
      )
    );
  }
}

module.exports = { NymPostfour };
