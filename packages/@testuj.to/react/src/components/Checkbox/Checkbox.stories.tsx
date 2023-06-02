import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Checkbox } from ".";

export default {
  component: Checkbox,
  title: "Primitives/Checkbox",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Checkbox>;

const checkboxStory: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const CheckboxStory = checkboxStory.bind({});
CheckboxStory.args = {
  label: "I'm a label!",
  variant: "default",
};
