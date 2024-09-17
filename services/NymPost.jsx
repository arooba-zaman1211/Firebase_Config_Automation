const { JSX, Builder } = require("canvacord");

class NymPost extends Builder {
  constructor() {
    super(3590, 2203);
    this.bootstrap({
      Nym: "",
      type: "",
      definition: "",
    });

    this.backgroundImage = null;
    this.backgroundImageLoaded = false;
  }

  setNym(value) {
    this.options.set("Nym", value);
    return this;
  }

  setType(value) {
    this.options.set("type", value);
    return this;
  }

  setDefinition(value) {
    this.options.set("definition", value);
    return this;
  }

  async render() {
    const { type, Nym, definition } = this.options.getOptions();

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
            fontSize: "400px",
            fontFamily: "Cardo-Bold",
            color: "#000000",
            marginBottom: "0",
            lineHeight: "1",
          },
        },
        Nym
      ),

      JSX.createElement(
        "span",
        {
          style: {
            fontSize: "150px",
            fontFamily: "Inter-Italic",
            color: "#7D7D7D",
            marginBottom: "50px",
            marginTop: "20px",
          },
        },
        type
      ),

      JSX.createElement(
        "p",
        {
          style: {
            fontSize: "200px",
            fontFamily: "Inter-Regular",
            color: "#000000",
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
