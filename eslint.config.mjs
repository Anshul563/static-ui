import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/.next/**",
    "**/.turbo/**",
    "**/coverage/**",
    "**/storybook-static/**",
    "**/playwright-report/**",
    "*.config.*",
    "**/*.config.*",
  ]),

  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx,js,jsx}"],
  })),

  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error",
    },
  },

  {
    files: ["packages/ui/src/**/*.{ts,tsx}"],
    rules: {
      "no-console": "warn",
    },
  },
])
