import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Select } from ".";

export default {
  component: Select,
  title: "Primitives/Select",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Select>;

const selectStory: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const SelectStory = selectStory.bind({});
SelectStory.args = {
  placeholder: "Select a value",
  label: "Some label here",
  options: [
    {
      value: "a",
      label: "Option A",
    },
    {
      value: "b",
      label: "Option B",
    },
    {
      value: "c",
      label: "Option C",
    },
    {
      value: "d",
      label: "Option D",
    },
    {
      value: "e",
      label: "Option E 123456",
    },
  ],
};
