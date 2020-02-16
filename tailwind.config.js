module.exports = {
  theme: {
    colors: {
      primary: {
        default: "#917149",
        hover: "#7B603E",
        active: "#745A3A",
      },
      secondary: "#E3C094",
      background: "#FDFAF7",
      dark: "#3A3630",
      separator: "rgb(236, 236, 236)",
      white: { default: "#ffffff", hover: "#D2D0CD", active: "#C0BCB8" },
      black: "#000000",
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
      },
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "active", "disabled"],
  },
  plugins: [],
}
