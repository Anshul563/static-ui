import type { StorybookConfig } from "@storybook/react-vite"
import { mergeConfig } from "vite"
import tailwindcss from "@tailwindcss/postcss"
import path from "path"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        postcss: {
          plugins: [tailwindcss()],
        },
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../../../packages/ui/src"),
        },
      },
    })
  },
}
export default config
