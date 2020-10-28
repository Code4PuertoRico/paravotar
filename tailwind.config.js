module.exports = {
  theme: {
    colors: {
      primary: {
        default: "#886944",
        hover: "#7B603E",
        active: "#745A3A",
      },
      secondary: "#E3C094",
      background: "#FDFAF7",
      dark: "#342F2D",
      gray: "#959595",
      separator: "rgb(220, 220, 220)",
      white: { default: "#ffffff", hover: "#D2D0CD", active: "#C0BCB8" },
      black: "#000000",
      red: { default: "#EA0000", hover: "#C20000", active: "#FF0000" },
      ballots: {
        governmental: "#CCCDCF",
        legislative: "#FCF1D9",
        municipal: "#FEF8B9",
      },
      footer: "rgba(58,54,48, 0.24)",
      navbar: "#f5ddc0",
      socialMedia: {
        twitter: "#1DA1F2",
        facebook: "#4267B2"
      }
    },
    fontFamily: {
      body: ["Inter", "Helvetica"],
      display: ["Inter", "Helvetica"],
    },
    extend: {
      fontSize: {
        "9xl": "72px",
      },
      spacing: {
        "78": "25rem",
        "104": "26rem",
        "120": "30rem",
        "128": "31rem",
      },
      inset: {
        "-h-screen": "-100vh",
      },
    },
  },
  variants: {
    visibility: ["responsive", "hover", "focus"],
    backgroundColor: ["responsive", "hover", "active", "focus", "disabled"],
    borderRadius: ["responsive", "hover", "focus"],
    margin: ["responsive", "first"],
    borderWidth: ["responsive", "last"],
    width: ["responsive", "hover", "focus"],
    height: ["responsive", "hover", "focus"],
    zIndex: ["responsive", "hover", "focus"],
  },
  plugins: [],
  purge: false,
}
