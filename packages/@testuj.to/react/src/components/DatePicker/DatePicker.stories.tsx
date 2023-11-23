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
  onChange: (date) => console.log(date),
  value: new Date(),
  translationFunciton: (key: string) => key,
  className: "test",
  dateTime: true,
  dateFormat: "dd.MM.yyyy HH:mm",
};
