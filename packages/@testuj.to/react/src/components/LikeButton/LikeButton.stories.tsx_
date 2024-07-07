import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { LikeButton } from ".";

export default {
  component: LikeButton,
  title: "Primitives/LikeButton",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof LikeButton>;

const LikeButtonStoryTemplate: ComponentStory<typeof LikeButton> = (args) => (
  <LikeButton {...args} />
);

export const Basic = LikeButtonStoryTemplate.bind({});
Basic.args = {
  children: "Click me",
  liked: false,
  variant: "circle",
};
