export default [
  {
    files: ["Public/js/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: {
  document: "readonly",
  window: "readonly",
  console: "readonly",
  fetch: "readonly",
  localStorage: "readonly",
  alert: "readonly",
  XMLHttpRequest: "readonly",
  module: "readonly"
},
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];