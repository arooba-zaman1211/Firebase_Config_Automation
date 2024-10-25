// Id 1 design
const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");
const { createCanvas } = require("canvas");

// Load fonts from file
Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);
Font.fromFileSync("public/assets/fonts/Raleway/Raleway-Regular.ttf", "Raleway");

class NymPostseven extends Builder {
  constructor({
    width = 3852, // Outer border width
    height = 4398, // Outer border height
    nymFontSize = "540px", // Default font size for Nym text
    nymLineHeight = "628.02px", // Default line height for Nym text
    definitionFontSize = "250px", // Default font size for Definition text
    definitionLineHeight = "293.5px", // Default line height for Definition text
    Nym = "Your Nym Text Here",
    Definition = "Your Definition Text Here",
    NymColor = "#000000",
    formatNym = false, // Whether to format Nym to uppercase
    top = 326, // Top position for Nym text
    definitionTop = 904, // Top position for Definition text
    left = 0, // Left position for both texts
    nymWidth = 3263, // Width for Nym text
    nymHeight = 558, // Height for Nym text
    definitionWidth = 3263, // Width for Definition text
    definitionHeight = 241, // Height for Definition text
    distanceBetweenTexts = 20, // Distance between Nym and Definition
    backgroundImageUrl = null, // Background image URL
  } = {}) {
    super(width, height);
    this.bootstrap({
      Nym,
      Definition,
      NymColor,
      nymFontSize,
      definitionFontSize,
      backgroundImageUrl,
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
      distanceBetweenTexts,
      backgroundImageUrl, // Add this to styles
    };
  }

  async render() {
    const { Nym, Definition, NymColor, backgroundImageUrl } =
      this.options.getOptions();
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
      nymHeight,
      definitionWidth,
      definitionHeight,
      distanceBetweenTexts,
    } = this.styles;

    const canvas = createCanvas(1, 1);
    const context = canvas.getContext("2d");

    // Split text into multiple lines if it's too long
    const splitTextIfNeeded = (text, maxWidth) => {
      context.font = `${nymFontSize} BubbleGum`;
      let words = text.split("");
      let currentLine = "";
      let lines = [];
      let breakAdded = false;

      words.forEach((letter) => {
        const testLine = currentLine + letter;
        const { width: testLineWidth } = context.measureText(testLine);

        if (testLineWidth > maxWidth && !breakAdded) {
          lines.push(currentLine);
          currentLine = "-" + letter; // Start a new line with the dash
          breakAdded = true;
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine) lines.push(currentLine);

      return lines;
    };

    const lines = splitTextIfNeeded(Nym.toUpperCase(), nymWidth);
    const adjustedNymHeight = lines.length * parseFloat(nymLineHeight);
    const adjustedDefinitionTop =
      top + adjustedNymHeight + distanceBetweenTexts;

    const adjustedDefinitionFontSize = definitionFontSize;
    const adjustedNymLineHeight = `${parseFloat(nymFontSize) * 1.15}px`;
    const adjustedDefinitionLineHeight = `${
      parseFloat(adjustedDefinitionFontSize) * 1.15
    }px`;
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
          backgroundImage: backgroundImageUrl
            ? `url(${backgroundImageUrl})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        },
      },
      lines.map((line, index) =>
        JSX.createElement(
          "h1",
          {
            key: index,
            style: {
              fontSize: nymFontSize,
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
              lineHeight: adjustedNymLineHeight,
              width: `${nymWidth}px`,
              margin: 0,
              position: "absolute",
              top: `${top + index * parseFloat(nymLineHeight)}px`,
              left: `${left}px`,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              textTransform: "uppercase",
            },
          },
          line
        )
      ),
      JSX.createElement(
        "p",
        {
          style: {
            fontSize: adjustedDefinitionFontSize,
            fontFamily: "Raleway",
            color: "#9191DD",
            lineHeight: adjustedDefinitionLineHeight,
            width: `${definitionWidth}px`,
            height: `${definitionHeight}px`,
            margin: 0,
            position: "absolute",
            top: `869px`,
            left: `146px`,
            whiteSpace: "pre-wrap",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            fontWeight: 700,
            textShadow: `
            0.8px 0.8px 0 #9191DD, 
            -0.8px -0.8px 0 #9191DD,
            0.8px -0.8px 0 #9191DD, 
            -0.8px 0.8px 0 #9191DD
          `,
          },
        },
        Definition
      )
    );
  }
}

module.exports = { NymPostseven };
