import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { SteppedProgressBar } from ".";

export default {
  component: SteppedProgressBar,
  title: "Primitives/SteppedProgressBar",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof SteppedProgressBar>;

const steppedProgressBarStory: ComponentStory<typeof SteppedProgressBar> = (args) => (
  <SteppedProgressBar {...args} />
);

export const SteppedProgressBarStory = steppedProgressBarStory.bind({});
SteppedProgressBarStory.args = {};
