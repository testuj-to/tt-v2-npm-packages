import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Input } from ".";

export default {
  component: Input,
  title: "Primitives/Input",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Input>;

const inputStory: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputStory = inputStory.bind({});
InputStory.args = {
  placeholder: "Write here",
  icon: <div>X</div>,
};
