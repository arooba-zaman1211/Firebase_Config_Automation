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
          backgroundImage: `url(${this.backgroundImage.toDataURL()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          padding: "240px 150px", // Increased padding to position text better
          boxSizing: "border-box",
        },
      },
      // Nym (Title)
      JSX.createElement(
        "h1",
        {
          style: {
            fontSize: "100px", // Adjusted Font size for the Nym
            fontFamily: "Cardo-Bold", 
            color: "#000000",
            marginBottom: "0",
            lineHeight: "1",
          },
        },
        Nym
      ),
      // Type (Subtitle)
      JSX.createElement(
        "span",
        {
          style: {
            fontSize: "48px", // Adjusted Font size for the type
            fontFamily: "Inter-Italic",
            color: "#7D7D7D", // Adjusted color to a lighter gray
            marginBottom: "50px", // Reduced space between type and definition
            marginTop: "0",
          },
        },
        type
      ),
      // Definition (Body Text)
      JSX.createElement(
        "p",
        {
          style: {
            fontSize: "50px", // Adjusted Font size for the definition
            fontFamily: "Inter-Regular",
            color: "#000000",
            lineHeight: "1.4", // Adjusted line height for better readability
            marginTop: "50px", // Remove top margin
            marginBottom: "0", // Remove bottom margin
          },
        },
        definition
      )
    );
  }
}