import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Alert } from ".";

export default {
  component: Alert,
  title: "Primitives/Alert",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Alert>;

const alertStoryTemplate: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Basic = alertStoryTemplate.bind({});
Basic.args = {
  children:
    "Jakmile produkt dorazí, klikněte na tlačítko „Obdržel jsem produkt“ níže. Budeme tak vědět, že vám dorazil.",
  variant: "info",
};
