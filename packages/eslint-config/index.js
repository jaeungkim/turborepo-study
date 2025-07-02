import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default [
  {
    name: "base-config",
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        $: true,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      import: eslintPluginImport,
      jsxA11y: eslintPluginJsxA11y,
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": reactHooks,
    },
    rules: {
      /** --- Import / Order --- */
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling"],
            "index",
            "type",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "{react*,react*/**}",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
        },
      ],
      "no-duplicate-imports": "off",
      "import/no-duplicates": "error",

      /** --- TypeScript --- */
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          selector: "variable",
          leadingUnderscore: "allow",
        },
        { format: ["camelCase", "PascalCase"], selector: "function" },
        { format: ["PascalCase"], selector: "interface" },
        { format: ["PascalCase"], selector: "typeAlias" },
      ],
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          caughtErrors: "none",
          argsIgnorePattern: "^_", // Ignore unused variables starting with "_"
          varsIgnorePattern: "^_", // Ignore unused variables starting with "_"
        },
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "public-static-field",
            "private-static-field",
            "public-instance-field",
            "private-instance-field",
            "public-constructor",
            "private-constructor",
            "public-instance-method",
            "private-instance-method",
          ],
        },
      ],
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-var-requires": "off",

      /** --- React --- */
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": ["error", { ignore: ["css"] }],

      /** --- React Hooks --- */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn", //TODO: error? or warn?

      /** --- General JS Rules --- */
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      curly: ["error", "all"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "prefer-destructuring": ["error", { object: true, array: false }],
      "default-param-last": "error",
    },
    settings: {
      react: {
        version: "18.2",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  eslintConfigPrettier,
];
