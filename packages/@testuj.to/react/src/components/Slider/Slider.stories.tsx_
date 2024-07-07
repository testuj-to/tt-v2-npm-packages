import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Slider } from ".";

export default {
  component: Slider,
  title: "Primitives/Slider",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Slider>;

const sliderStoryTemplate: ComponentStory<typeof Slider> = (args) => (
  <div style={{ width: "300px" }}>
    <Slider {...args} />
  </div>
);

export const Basic = sliderStoryTemplate.bind({});
Basic.args = {
  min: 0,
  onChange: () => {},
  max: 100,
  step: 1,
  defaultValue: 50,
  // value: 50,
};
