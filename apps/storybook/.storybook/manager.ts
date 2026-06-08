import { addons } from "@storybook/manager-api"

addons.setConfig({
  sidebar: {
    filters: {
      patterns: (_item) => {
        return true
      },
    },
  },
})
