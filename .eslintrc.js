module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "next", "prettier"],
  plugins: ["prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "no-restricted-exports": "off",
  },
};
