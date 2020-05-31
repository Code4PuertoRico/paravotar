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
      separator: "rgb(220, 220, 220)",
      white: { default: "#ffffff", hover: "#D2D0CD", active: "#C0BCB8" },
      black: "#000000",
      red: "indianred",
      ballots: {
        governmental: "#CCCDCF",
        legislative: "#FCF1D9",
        municipal: "#FEF8B9",
      },
      footer: "rgba(58,54,48, 0.24)",
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
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "active", "disabled"],
    borderRadius: ["responsive", "hover", "focus"],
    margin: ["responsive", "first"],
    borderWidth: ["responsive", "last"],
  },
  plugins: [],
}
