module.exports = {
  verbose: true,
  transform: {
    "^.+\\.[jt]sx?$": `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testRegex: "\\.spec\\.[jt]sx?$",
  testPathIgnorePatterns: [
    `node_modules`,
    `.eslintrc.spec.js`,
    `\\.cache`,
    `<rootDir>.*/public`,
  ],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  coverageDirectory: ".coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
  coveragePathIgnorePatterns: [
    `./node_modules/`,
    `./.dist/`,
    `./build/`,
    `.eslintrc.js`,
    "eslintrc.spec.js",
    ".eslintrc.spec.js",
    "\\.config.js$",
    "\\.d\\.ts$",
  ],
  coverageReporters: ["text", "cobertura"],
  clearMocks: true,
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`],
  setupFilesAfterEnv: [`<rootDir>/setup-test-env.js`],
}
