const js = require("@typescript-eslint/parser");

module.exports = [
  js.configs.recommended,

  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
];
