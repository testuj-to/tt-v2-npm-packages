import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { RatingBarChart } from ".";

export default {
  component: RatingBarChart,
  title: "Primitives/RatingBarChart",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof RatingBarChart>;

const ratingBarChartStory: ComponentStory<typeof RatingBarChart> = (args) => (
  <div style={{ width: "310px", border: "1px solid black", padding: "1rem" }}>
    <RatingBarChart {...args} />
  </div>
);

export const RatingBarChartStory = ratingBarChartStory.bind({});
RatingBarChartStory.args = {
  items: [
    {
      label: "5",
      value: 16,
    },
    {
      label: "4",
      value: 14,
    },
    {
      label: "3",
      value: 8,
    },
    {
      label: "2",
      value: 1,
    },
    {
      label: "1",
      value: 0,
    },
  ],
};
