const { JSX, Builder } = require("canvacord");

class NymPost extends Builder {
  constructor() {
    super(3590, 2203);
    this.bootstrap({
      Nym: "",
      NymColor: "#000000", // Default Nym color (black)
      type: "",
      typeColor: "#7D7D7D", // Default type color (gray)
      definition: "",
      definitionColor: "#000000", // Default definition color (black)
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

  async render() {
    const { type, Nym, definition, NymColor, typeColor, definitionColor } =
      this.options.getOptions();

    return JSX.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          padding: "200px 100px",
          boxSizing: "border-box",
        },
      },
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: "610px",
            fontFamily: "Cardo-Bold",
            color: NymColor, // Apply dynamic color to Nym
            marginBottom: "0",
            lineHeight: "1",
            height: "870px",
            width: "3533px",
          },
        },
        Nym
      ),

      JSX.createElement(
        "span",
        {
          style: {
            fontSize: "210px",
            fontFamily: "Inter-Italic",
            color: typeColor, // Apply dynamic color to type
            marginBottom: "50px",
            marginTop: "30px",
          },
        },
        type
      ),

      JSX.createElement(
        "div", // Horizontal line after type
        {
          style: {
            display: "flex",
            width: "70%",
            height: "4px", // Thickness of the line
            backgroundColor: definitionColor, // Color of the line (black, but can be customized)
            margin: "20px 0",
            marginTop: "30px",
          },
        }
      ),

      JSX.createElement(
        "p",
        {
          style: {
            fontSize: "313px",
            fontFamily: "Inter-Regular",
            color: definitionColor, // Apply dynamic color to definition
            lineHeight: "1.4",
            marginTop: "30px",
            marginBottom: "0",
          },
        },
        definition
      )
    );
  }
}

module.exports = { NymPost };
