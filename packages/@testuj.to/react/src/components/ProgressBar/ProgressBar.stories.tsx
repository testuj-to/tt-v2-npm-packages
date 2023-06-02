import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { ProgressBar } from ".";

export default {
  component: ProgressBar,
  title: "Primitives/ProgressBar",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof ProgressBar>;

const progressBarStory: ComponentStory<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const ProgressBarStory = progressBarStory.bind({});
ProgressBarStory.args = {
  label: "I'm a label!",
  variant: "default",
};
