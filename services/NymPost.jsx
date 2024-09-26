const { JSX, Builder } = require("canvacord");

class NymPost extends Builder {
  constructor(width = 3590, height = 2203) {
    super(width, height);
    this.bootstrap({
      Nym: "",
      NymColor: "#000000", // Default Nym color (black)
      type: "",
      typeColor: "#7D7D7D", // Default type color (gray)
      definition: "",
      definitionColor: "#000000", // Default definition color (black)
      nymFontSize: "610px", // Default font size for Nym
      typeFontSize: "210px", // Default font size for type
      definitionFontSize: "313px", // Default font size for definition
      marginTop: "",
      Width: "",
      Height: "",
      Padding: "",
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

  setType(value) {
    this.options.set("type", value);
    return this;
  }

  setTypeColor(color) {
    this.options.set("typeColor", color);
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

  setTypeFontSize(size) {
    this.options.set("typeFontSize", size);
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

  setPadding(padding) {
    this.options.set("Padding", padding);
    return this;
  }

  async render() {
    const {
      type,
      Nym,
      definition,
      NymColor,
      typeColor,
      definitionColor,
      nymFontSize,
      typeFontSize,
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
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundSize: "cover",
          backgroundPosition: "start",
          width: Width,
          height: Height,
          padding: Padding, // Adjust padding for better alignment
          boxSizing: "border-box",
          marginTop: marginTop,
        },
      },
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: nymFontSize, // Large font for Nym
            fontFamily: "Cardo-Bold", // Bold font style
            color: NymColor,
            lineHeight: "1",
            marginBottom: "10px", // Reduce bottom margin
          },
        },
        Nym
      ),

      JSX.createElement(
        "span",
        {
          style: {
            fontSize: typeFontSize, // Smaller font size for type
            fontFamily: "Inter-Italic", // Italic for type
            color: typeColor,
            marginBottom: "20px", // Increased spacing between type and line
          },
        },
        type
      ),

      JSX.createElement("span", {
        style: {
          display: "block", // Horizontal line
          width: "70%",
          height: "16px", // Adjust thickness
          backgroundColor: definitionColor, // Same color as the definition text
          margin: "10px 0", // Adjust margin for spacing
          marginTop: "10px",
        },
      }),

      JSX.createElement(
        "p",
        {
          style: {
            fontSize: definitionFontSize, // Adjust font size for definition
            fontFamily: "Inter-Regular", // Regular font style
            color: definitionColor,
            lineHeight: "1.4",
            marginTop: "40px", // Space above definition text
            marginBottom: "0",
            width: "100%",
          },
        },
        definition
      )
    );
  }
}

module.exports = { NymPost };
