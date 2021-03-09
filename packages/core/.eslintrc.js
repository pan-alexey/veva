module.exports = {
  // extends: ["./.eslintrc.base.js", "./index.js", "./prettier.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  plugins: [
    "prettier",
    'filenames',
    "@typescript-eslint",
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "prettier",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "prettier/prettier": "error",
    // Regex for kebab-case
    "filenames/match-regex": [2, "^([a-z]+|[a-z]+(-[a-z])+|[a-z]+(.spec)+|[a-z]+(-[a-z])+(.spec)+)$", true],
  }
};
