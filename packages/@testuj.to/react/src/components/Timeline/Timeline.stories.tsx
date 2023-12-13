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
  activeItem: 0,
  dateZero: new Date(new Date().getTime() - oneDay * 3).getTime(),
  steps: [
    {
      label: "Začátek přihlašování",
      subLabel: new Date(new Date().getTime() + oneDay * 3).toLocaleDateString("cs"),
      popup: "Probíhá přihlašování",
      date: new Date(new Date().getTime() + oneDay * 3).getTime(),
    },
    {
      label: "Konec přihlašování",
      subLabel: new Date(new Date().getTime() + oneDay * 5).toLocaleDateString("cs"),
      popup: "Produkty odeslány",
      date: new Date(new Date().getTime() + oneDay * 5).getTime(),
    },
    {
      label: "Doručení produktů",
      subLabel: new Date(new Date().getTime() + oneDay * 7).toLocaleDateString("cs"),
      popup: "Produkty doručeny",
      date: new Date(new Date().getTime() + oneDay * 7).getTime(),
    },
    {
      label: "Doručení produktů",
      subLabel: new Date(new Date().getTime() + oneDay * 9).toLocaleDateString("cs"),
      popup: "Produkty odeslány",
      date: new Date(new Date().getTime() + oneDay * 9).getTime(),
    },
    {
      label: "Doručení produktů",
      subLabel: new Date(new Date().getTime() + oneDay * 20).toLocaleDateString("cs"),
      popup: "",
      date: new Date(new Date().getTime() + oneDay * 20).getTime(),
    },
  ],
};
