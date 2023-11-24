import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { DatePicker } from ".";

export default {
  component: DatePicker,
  title: "Primitives/DatePicker",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof DatePicker>;

const datePickerStoryTemplate: ComponentStory<typeof DatePicker> = (args) => (
  <DatePicker {...args} />
);

export const Basic = datePickerStoryTemplate.bind({});
Basic.args = {
  translationFunciton: (key: string) => key,
  onChange: (dateRange: [Date | null, Date | null]) => console.log(dateRange),
  type: "single",
  selected: new Date(),
};
