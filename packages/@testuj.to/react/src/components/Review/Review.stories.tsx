import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Review } from ".";

export default {
  component: Review,
  title: "Composites/Review",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Review>;

const reviewStoryTemplate: ComponentStory<typeof Review> = (args) => <Review {...args} />;

export const Basic = reviewStoryTemplate.bind({});
Basic.args = {};
