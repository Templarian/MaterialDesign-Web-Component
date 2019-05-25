module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.html$": "./jest/htmlLoader.js",
    "^.+\\.css$": "./jest/cssLoader.js"
  },
  "setupFiles": [
    "<rootDir>/node_modules/document-register-element/build/document-register-element.js"
  ],
  "testEnvironment": "jest-environment-jsdom-fourteen"
}