import { defineConfig, globalIgnores } from "eslint/config"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["storybook-static/**", "dist/**", "node_modules/**"]),
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ["**/*.{ts,tsx}"],
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
    },
  },
])
