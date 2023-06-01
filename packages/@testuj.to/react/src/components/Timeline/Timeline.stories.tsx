import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Timeline } from ".";

export default {
  component: Timeline,
  title: "Primitives/Timeline",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Timeline>;

const timelineStory: ComponentStory<typeof Timeline> = (args) => (
  <div style={{ width: "800px" }}>
    <Timeline {...args} />
  </div>
);

export const TimelineStory = timelineStory.bind({});
TimelineStory.args = {
  activeItem: 2,
  steps: [
    {
      label: "Začátek přihlašování",
      subLabel: "6. 4. 2023",
      popup: "Probíhá přihlašování",
    },
    {
      label: "Konec přihlašování",
      subLabel: "20. 4. 2023",
      popup: "Produkty odeslány",
    },
    {
      label: "Doručení produktů",
      subLabel: "24. 4. 2023",
      popup: "Produkty doručeny",
    },
    {
      label: "Doručení produktů",
      subLabel: "28. 4. 2023",
      popup: "Produkty odeslány",
    },
    {
      label: "Doručení produktů",
      subLabel: "28. 4. 2023",
      popup: "Produkty odeslány",
    },
  ],
};
