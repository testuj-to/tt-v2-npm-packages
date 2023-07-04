import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { DashedBarChart } from ".";

export default {
  component: DashedBarChart,
  title: "Primitives/DashedBarChart",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof DashedBarChart>;

const dashedBarChartStory: ComponentStory<typeof DashedBarChart> = (args) => (
  <div style={{ width: "590px", border: "1px solid black", padding: "1rem" }}>
    <DashedBarChart {...args} />
  </div>
);

export const DashedBarChartStory = dashedBarChartStory.bind({});
DashedBarChartStory.args = {
  items: [
    {
      label: "Nepoškozuje vlasy",
      value: 10,
    },
    {
      label: "Dobře se čistí",
      value: 60,
    },
    {
      label: "Pokožka bez reakce",
      value: 50,
    },
    {
      label: "Nezanechává barevné stopy",
      value: 0,
    },
    {
      label: "Nepodráždí oči",
      value: 100,
    },
  ],
};
