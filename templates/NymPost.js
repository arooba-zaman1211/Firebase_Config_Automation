import { JSX, Builder, loadImage } from "canvacord";

export class NymPost extends Builder {
  constructor() {
    super(1080, 1080);
    this.bootstrap({
      Nym: "",
      type: "",
      definition: "",
    });

    // Load the background image once during instantiation
    this.backgroundImage = null;
    this.backgroundImageLoaded = false;
    this.backgroundImagePromise = this.loadBackgroundImage();
  }

  async loadBackgroundImage() {
    try {
      this.backgroundImage = await loadImage("assets/images/bg.png");
      this.backgroundImageLoaded = true;
    } catch (error) {
      console.error("Failed to load background image:", error);
    }
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
    // Wait for the background image to load if it hasn't already
    if (!this.backgroundImageLoaded) {
      await this.backgroundImagePromise;
      if (!this.backgroundImageLoaded) {
        throw new Error("Background image not loaded.");
      }
    }

    const { type, Nym, definition } = this.options.getOptions();

    return JSX.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          backgroundImage: `url(${this.backgroundImage.toDataURL()})`, // Use the preloaded background image
          backgroundSize: "cover", // Cover the entire area
          backgroundPosition: "center", // Center the image
          width: "100%",
          height: "100%",
          padding: "80px", // Adjust padding to match the design
          boxSizing: "border-box",
        },
      },
      // Nym (Title)
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: "80px", // Font size for the Nym
            fontFamily: "CardoBold", // Cardo font, bold
            color: "#000000", // Black color
            marginBottom: "20px", // Space between Nym and type
          },
        },
        Nym
      ),
      // Type (Subtitle)
      JSX.createElement(
        "span",
        {
          style: {
            fontSize: "40px", // Font size for the type
            fontFamily: "Inter-Italic", // Inter font, regular
            color: "#545454", // Gray color for the type
            marginBottom: "40px", // Space between type and definition
            // fontStyle: "normal",
          },
        },
        type
      ),
      // Definition (Body Text)
      JSX.createElement(
        "p",
        {
          style: {
            fontSize: "40px", // Font size for the definition
            fontFamily: "Inter-Regular", // Inter font, regular
            color: "#000000", // Black color
            lineHeight: "1.4", // Line height for readability
            marginTop: "0", // Remove top margin
          },
        },
        definition
      )
    );
  }
}