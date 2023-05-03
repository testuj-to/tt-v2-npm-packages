import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { StarsRating } from ".";

export default {
  component: StarsRating,
  title: "Primitives/StarsRating",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof StarsRating>;

const starsRatingStory: ComponentStory<typeof StarsRating> = (args) => <StarsRating {...args} />;

export const StarsRatingStory = starsRatingStory.bind({});
StarsRatingStory.args = {
  rating: 3.6,
  onChange: (rating: number) => alert(`You changed me! ${rating}`),
};
