import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Card } from ".";

export default {
  component: Card,
  title: "Primitives/Card",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Card>;

const accordionStoryTemplate: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Basic = accordionStoryTemplate.bind({});
Basic.args = {
  children: <div>Hello from card</div>,
  onClick: () => alert("You clicked me!"),
  backgroundColor: "red",
  backgroundImage: "url(https://picsum.photos/200/300)",
  style: { width: "200px", height: "200px", padding: "10px" },
};
