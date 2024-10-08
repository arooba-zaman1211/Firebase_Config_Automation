const { JSX, Builder } = require("canvacord");
const { Font } = require("canvacord");

Font.fromFileSync(
  "public/assets/fonts/BubbleGum/BubblegumSans-Regular.ttf",
  "BubbleGum"
);
Font.fromFileSync("public/assets/fonts/Raleway/Raleway-Regular.ttf", "Raleway");

class NymPosttwo extends Builder {
  constructor(width = 3590, height = 2203) {
    super(width, height);
    this.bootstrap({
      Nym: "",
      NymColor: "#000000", // Default Nym color (black)
      definition: "",
      definitionColor: "#000000", // Default definition color (black)
      nymFontSize: "610px", // Default font size for Nym
      definitionFontSize: "313px", // Default font size for definition
      marginTop: "",
      Width: width + "px", // Set width to the default width provided
      Height: height + "px", // Set height to the default height provided
      Padding: "50px",
    });

    this.backgroundImage = null;
    this.backgroundImageLoaded = false;
  }

  setNym(value) {
    this.options.set("Nym", value);
    return this;
  }

  setNymColor(color) {
    this.options.set("NymColor", color);
    return this;
  }

  setDefinition(value) {
    this.options.set("definition", value);
    return this;
  }

  setDefinitionColor(color) {
    this.options.set("definitionColor", color);
    return this;
  }

  setNymFontSize(size) {
    this.options.set("nymFontSize", size);
    return this;
  }

  setDefinitionFontSize(size) {
    this.options.set("definitionFontSize", size);
    return this;
  }

  setMarginTop(margin) {
    this.options.set("marginTop", margin);
    return this;
  }

  setWidth(size) {
    this.options.set("Width", size);
    return this;
  }

  setHeight(size) {
    this.options.set("Height", size);
    return this;
  }

  setPadding(left) {
    this.options.set("Padding", `0 0 0 ${left}`);
    return this;
  }

  async render() {
    const {
      Nym,
      definition,
      NymColor,
      definitionColor,
      nymFontSize,
      definitionFontSize,
      marginTop,
      Width,
      Height,
      Padding,
    } = this.options.getOptions();

    return JSX.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center elements horizontally
          justifyContent: "center", // Center elements vertically
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: Width,
          height: Height,
          boxSizing: "border-box",
          marginTop: marginTop,
          padding: Padding, // Ensure padding is included
        },
      },
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: nymFontSize, // Use the fixed font size for Nym
            fontFamily: "BubbleGum",
            color: NymColor,
            lineHeight: "1", // Ensures no extra space between lines
            margin: "0", // Remove default margin
            paddingBottom: "20px", // Optional: spacing between Nym and definition
            textAlign: "center", // Center align Nym text
            whiteSpace: "normal", // Allow text to wrap to the next line
            overflowWrap: "break-word", // Break long words onto the next line if necessary
            maxWidth: "90%", // Limit maximum width to allow for better wrapping
          },
        },
        Nym // Render Nym text
      ),

      JSX.createElement(
        "p",
        {
          style: {
            fontSize: definitionFontSize, // Font size for definition
            fontFamily: "Raleway",
            color: definitionColor,
            lineHeight: "1.4",
            margin: "0", // Remove default margin
            textAlign: "center", // Center align definition
            paddingTop: "20px", // Optional: spacing above definition
            whiteSpace: "normal", // Allow text to wrap to the next line
            overflowWrap: "break-word", // Break long words onto the next line if necessary
            maxWidth: "90%", // Limit maximum width to allow for better wrapping
          },
        },
        definition // Render the definition
      )
    );
  }
}

module.exports = { NymPosttwo };
