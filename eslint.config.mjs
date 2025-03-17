import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import stylisticJs from "@stylistic/eslint-plugin-js"
import eslintPluginImport from "eslint-plugin-import"; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "@stylistic/js": stylisticJs,
      import: eslintPluginImport, 
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/object-curly-spacing": ["error", "always", { "objectsInObjects": true }],
      "@stylistic/js/quotes": ["error", "double"],
      "import/order": [
        "error",
        {
          "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        }
      ]
    }
  }
];

export default eslintConfig;
