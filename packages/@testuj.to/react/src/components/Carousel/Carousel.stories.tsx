import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Carousel } from ".";

export default {
  component: Carousel,
  title: "Primitives/Carousel",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Carousel>;

const carouselStoryTemplate: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

export const Basic = carouselStoryTemplate.bind({});
Basic.args = {
  items: [
    <div style={{ width: 200, height: 200, backgroundColor: "red" }} />,
    <div style={{ width: 200, height: 200, backgroundColor: "blue" }} />,
    <div style={{ width: 200, height: 200, backgroundColor: "green" }} />,
    <div style={{ width: 200, height: 200, backgroundColor: "yellow" }} />,
    <div style={{ width: 200, height: 200, backgroundColor: "purple" }} />,
  ],
};
