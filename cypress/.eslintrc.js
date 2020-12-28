module.exports = {
  root: true,
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  env: {
    "cypress/globals": true
  },
  plugins: [
    "@typescript-eslint",
    "cypress",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
  ]
}
