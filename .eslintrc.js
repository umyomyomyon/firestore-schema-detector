module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
  },
  settings: {
    "import/resolver": {
      typescript: { project: "./" },
      node: {
        paths: ["src"],
      },
    },
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    // https://thewebdev.info/2022/03/18/how-to-fix-the-missing-file-extension-ts-import-extensions-error-with-typescript-and-eslint/
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/prefer-default-export": "off",
    "import/no-unresolved": [
      "error",
      {
        ignore: ["^firebase-admin/.+"],
      },
    ],
  },
};
