import type { Preview } from "@storybook/react"
import { withThemeByClassName } from "@storybook/addon-themes"

import "../src/globals.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: ["Introduction", "Components", "Blocks"],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "dark",
    }),
  ],
  tags: ["autodocs"],
}

export default preview
