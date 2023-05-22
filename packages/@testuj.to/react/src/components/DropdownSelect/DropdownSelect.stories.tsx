import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { DropdownSelect } from ".";

export default {
  component: DropdownSelect,
  title: "Primitives/DropdownSelect",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof DropdownSelect>;

const dropdownSelectStory: ComponentStory<typeof DropdownSelect> = (args) => (
  <DropdownSelect {...args} />
);

export const DropdownSelectStory = dropdownSelectStory.bind({});
DropdownSelectStory.args = {
  items: [
    { label: "Item 1", value: "item-1" },
    { label: "Item 2", value: "item-2" },
    { label: "Item 3", value: "item-3" },
    { label: "Item 4", value: "item-4" },
  ]
};
