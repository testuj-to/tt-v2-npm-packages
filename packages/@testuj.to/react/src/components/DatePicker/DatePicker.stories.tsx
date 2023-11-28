import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { DatePicker } from ".";
import { useState } from "react";

export default {
  component: DatePicker,
  title: "Primitives/DatePicker",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof DatePicker>;

const datePickerStoryTemplate: ComponentStory<typeof DatePicker> = (args) => {
  const [selected, setSelected] = useState<Date | null>(new Date());

  console.log(selected);

  return (
    <DatePicker {...args} selected={selected} onChange={(date) => setSelected(date as Date)} />
  );
};

export const Basic = datePickerStoryTemplate.bind({});
Basic.args = {
  translationFunciton: (key: string) => key,
  onChange: (dateRange: [Date | null, Date | null]) => console.log(dateRange),
  type: "single",
  selected: new Date(),
  dateFormat: "dd.MM.yyyy HH:mm",
  dateTime: true,
};
