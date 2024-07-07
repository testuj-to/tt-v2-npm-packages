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

const oneDay = 24 * 60 * 60 * 1000;

const timelineStory: ComponentStory<typeof Timeline> = (args) => (
  <div style={{ width: "800px" }}>
    <Timeline {...args} />
  </div>
);

export const TimelineStory = timelineStory.bind({});
TimelineStory.args = {
  activeItem: 1,
  dateZero: new Date(new Date().getTime() - oneDay * 3).getTime(),
  steps: [
    {
      date: 1702563876393 - oneDay / 2,
      subLabel: "14. 12. 2023",
      label: "Začátek přihlašování",
      popup: "Probíhá přihlašování",
    },
    {
      date: 1702940400000,
      subLabel: "19. 12. 2023",
      label: "Konec přihlašování",
      popup: "detail.delivery_inProgress",
    },
    {
      date: 1705532400000,
      subLabel: "18. 01. 2024",
      label: "30 dní na odeslání recenzí",
      popup: "Čas na odeslání recenzí",
    },
  ],
};
