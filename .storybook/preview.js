import React from "react";
import Center from "../src/components/center/center";
import { ThemeProvider, theme, CSSReset, Box } from "@chakra-ui/react";
import { withConsole } from '@storybook/addon-console';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from "@storybook/react";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story => (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Box m='4'>
        <Story />
      </Box>
    </ThemeProvider>
  )),
  ((storyFn, context) => withConsole()(storyFn)(context)),
  withKnobs,
  withA11y
];

addParameters({
  viewport: {
    viewports:  INITIAL_VIEWPORTS,
  },
});
