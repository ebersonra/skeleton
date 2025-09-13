const { configs } = require("@eslint/js");
const jest = require("eslint-plugin-jest");

module.exports = [
  {
    ...configs.recommended,
    files: ["**/*.js"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        console: "readonly",
        Buffer: "readonly",
        global: "readonly",
        exports: "readonly"
      }
    },
    rules: {
      ...configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "semi": ["error", "always"]
    },
  },
  {
    files: ["**/*.test.js", "**/*.spec.js", "**/__tests__/**/*.js"],
    plugins: {
      jest
    },
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
        require: "readonly",
        module: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        console: "readonly",
        Buffer: "readonly",
        global: "readonly",
        exports: "readonly"
      }
    },
    rules: {
      ...jest.configs.recommended.rules,
      "jest/prefer-expect-assertions": "warn",
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/valid-expect": "error"
    }
  }
];