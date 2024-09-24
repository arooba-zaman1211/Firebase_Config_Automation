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
          width: "3014px",
          height: "1946px",
          padding: "200px 100px",
          boxSizing: "border-box",
          marginTop: marginTop,
        },
      },
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: nymFontSize, // Use dynamic font size for Nym
            fontFamily: "Cardo-Bold",
            color: NymColor,
            lineHeight: "1",
            height: "870px",
            width: "3014px",
            marginBottom: "0px",
          },
        },
        Nym
      ),

      JSX.createElement(
        "span",
        {
          style: {
            fontSize: typeFontSize, // Use dynamic font size for type
            fontFamily: "Inter-Italic",
            color: typeColor,
            marginBottom: "50px",
            marginTop: "0", // Adjusted to bring it closer to h1
            width: "516px",
            height: "165px",
          },
        },
        type
      ),

      JSX.createElement("div", {
        style: {
          display: "flex",
          width: "70%",
          height: "16px", // Thickness of the line
          backgroundColor: definitionColor,
          margin: "20px 0",
          marginTop: "30px",
        },
      }),

      JSX.createElement(
        "p",
        {
          style: {
            fontSize: definitionFontSize, // Use dynamic font size for definition
            fontFamily: "Inter-Regular",
            color: definitionColor,
            lineHeight: "1.4",
            marginTop: "30px",
            marginBottom: "0",
            width: "3014px",
            height: "632px",
          },
        },
        definition
      )
    );
  }
}

module.exports = { NymPost };
