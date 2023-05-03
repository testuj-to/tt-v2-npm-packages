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

const sliderStoryTemplate: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Basic = sliderStoryTemplate.bind({});
Basic.args = {
  min: 0,
  // onChange: () => alert('You changed me!'),
};
