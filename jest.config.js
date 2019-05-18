module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.html$": "./jest/htmlLoader.js",
    "^.+\\.css$": "./jest/cssLoader.js"
  },
  "testEnvironment": "@skatejs/ssr/jest"
}