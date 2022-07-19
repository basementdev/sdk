module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "airbnb-typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {},
};
