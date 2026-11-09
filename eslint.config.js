// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: ["app", "saf"],
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: ["app", "saf"],
          style: "kebab-case",
        },
      ],
      "@angular-eslint/prefer-inject": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/class-literal-property-style": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/consistent-generic-constructors": "off",
      "no-var": "error",
      "prefer-const": "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/prefer-control-flow": "off",
    },
  }
]);
