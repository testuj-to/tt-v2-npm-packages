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

const carouselStoryTemplate: ComponentStory<typeof Carousel> = (args) => (
  <div style={{ width: "800px" }}>
    <Carousel {...args} />
  </div>
);

export const Basic = carouselStoryTemplate.bind({});
Basic.args = {
  items: [
    <div
      style={{ width: 200, height: 200, backgroundColor: "red" }}
      onClick={() => console.log("clicked")}
    >
      1
    </div>,
    <div
      style={{ width: 200, height: 200, backgroundColor: "blue" }}
      onClick={() => console.log("clicked")}
    >
      2
    </div>,
    <div
      style={{ width: 200, height: 200, backgroundColor: "green" }}
      onClick={() => console.log("clicked")}
    >
      3
    </div>,
    <div
      style={{ width: 200, height: 200, backgroundColor: "yellow" }}
      onClick={() => console.log("clicked")}
    >
      4
    </div>,
    <div
      style={{ width: 200, height: 200, backgroundColor: "purple" }}
      onClick={() => console.log("clicked")}
    >
      5
    </div>,
    <div
      style={{ width: 200, height: 200, backgroundColor: "red" }}
      onClick={() => console.log("clicked")}
    >
      6
    </div>,
    <div
      style={{ width: 200, height: 200, backgroundColor: "blue" }}
      onClick={() => console.log("clicked")}
    >
      7
    </div>,
    <div
      style={{ width: 200, height: 200, backgroundColor: "green" }}
      onClick={() => console.log("clicked")}
    >
      8
    </div>,
    <div
      style={{ width: 200, height: 200, backgroundColor: "yellow" }}
      onClick={() => console.log("clicked")}
    >
      9
    </div>,
    <div
      style={{ width: 200, height: 200, backgroundColor: "purple" }}
      onClick={() => console.log("clicked")}
    >
      10
    </div>,
  ],
  arrow: <div style={{ backgroundColor: "#fff", padding: "0.5rem" }}>arrow</div>,
};
