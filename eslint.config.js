import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "react/prop-types": "off",
      "no-console": "warn",

      "no-undef": "error",
      "no-unreachable": "error",
      "react/jsx-no-undef": "error",
      "react/react-in-jsx-scope": "off", // not needed for React 17+
      "prettier/prettier": ["warn"],
    },
  },
];
