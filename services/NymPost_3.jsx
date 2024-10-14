const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");

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
    nymFontSize = "60px",
    nymLineHeight = "55px",
    bottomTextWidth = 252,
    bottomTextHeight = 32,
    bottomTextTop = 350,
    bottomTextLeft = 186,
    bottomFontSize = "17px",
    bottomLineHeight = "17px",
    Nym = "CAUGHT FLIPPING AGAIN",
    BottomText = "Soy Wax Candle \n 4 oz / 20+ hours",
    NymColor = "#000000",
    formatNym = true, // New parameter to control Nym formatting
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
    };

    // Store the formatting preference
    this.formatNym = formatNym;
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
    const { Nym, BottomText, NymColor, nymFontSize, bottomFontSize } =
      this.options.getOptions();

    const {
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
      nymLineHeight,
      bottomTextWidth,
      bottomTextHeight,
      bottomTextTop,
      bottomTextLeft,
      bottomLineHeight,
    } = this.styles;

    // Format Nym text with line breaks between words only if formatNym is true
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
            justifyContent: "center", // Ensure vertical centering for Nym text
          },
        },
        // Middle Text (Nym Text) centered both vertically and horizontally
        JSX.createElement(
          "h1",
          {
            style: {
              fontSize: nymFontSize,
              fontFamily: "BubbleGum",
              color: NymColor,
              lineHeight: nymLineHeight,
              textAlign: "center",
              whiteSpace: "pre-wrap", // Enable line breaks
              width: `${nymWidth}px`,
              display: "flex",
              justifyContent: "center", // Horizontal centering
              alignItems: "center",
              flexDirection: "column", // Stack lines in a column
            },
          },
          formattedNym // Text with line breaks if formatting is enabled
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
            height: `${bottomTextHeight}px`, // Position bottom text under the inner border
            whiteSpace: "pre-wrap",
            justifyContent: "center",
          },
        },
        BottomText
      )
    );
  }
}

module.exports = { NymPostthree };
