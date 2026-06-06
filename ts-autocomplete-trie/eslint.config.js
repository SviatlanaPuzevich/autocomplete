import tseslint from "typescript-eslint";
import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["lib/**/*.ts"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      sourceType: "module",
    },
    rules: {
      ...prettierConfig.rules,

      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "warn",
      semi: ["error", "always"],
      "no-warning-comments": ["warn", { terms: ["todo", "fixme", "xxx"], location: "anywhere" }],
      "no-inline-comments": "warn",
      quotes: ["error", "double"],

      "prettier/prettier": "error",
    },
  },
);
