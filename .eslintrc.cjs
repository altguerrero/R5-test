module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:jest/recommended",
    "standard",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "@typescript-eslint",
    "react-hooks",
    "tailwindcss",
    "jest",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    camelcase: [
      "error",
      {
        ignoreDestructuring: true,
        properties: "never",
        allow: ["last_modified", "first_publish_date", "latest_revision"],
      },
    ],
  },
};
