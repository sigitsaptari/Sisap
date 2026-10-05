import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "SisapDS color theme (drives [data-theme])",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = (context.globals.theme as string) ?? "light";
      return Story();
    },
  ],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: { disable: true },
  },
};

export default preview;
