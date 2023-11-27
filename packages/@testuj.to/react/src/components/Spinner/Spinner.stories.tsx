import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Spinner } from ".";

export default {
  component: Spinner,
  title: "Primitives/Spinner",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Spinner>;

const spinnerStory: ComponentStory<typeof Spinner> = (args) => <Spinner {...args} />;

export const SpinnerStory = spinnerStory.bind({});
SpinnerStory.args = {};
