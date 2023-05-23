import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { DateRangePicker } from ".";

export default {
  component: DateRangePicker,
  title: "Primitives/DateRangePicker",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof DateRangePicker>;

const dateRangePickerStoryTemplate: ComponentStory<typeof DateRangePicker> = (args) => (
  <DateRangePicker {...args} />
);

export const Basic = dateRangePickerStoryTemplate.bind({});
Basic.args = {
  translationFunciton: (key: string) => key,
  dateRange: [new Date(), new Date()],
  onChange: (dateRange: [Date | null, Date | null]) => console.log(dateRange),
};
