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
      subLabel: "10.5.2023",
      popup: "Probíhá přihlašování",
      date: "10.05.2023",
    },
    {
      label: "Konec přihlašování",
      subLabel: "20. 5. 2023",
      popup: "Produkty odeslány",
      date: "20.05.2023",
    },
    {
      label: "Doručení produktů",
      subLabel: "30. 5. 2023",
      popup: "Produkty doručeny",
      date: "28.05.2023",
    },
    {
      label: "Doručení produktů",
      subLabel: "2.6.2023",
      popup: "Produkty odeslány",
      date: "02.06.2023",
    },
    {
      label: "Doručení produktů",
      subLabel: "1. 7. 2023",
      popup: "Produkty odeslány",
      date: "01.07.2023",
    },
  ],
};
