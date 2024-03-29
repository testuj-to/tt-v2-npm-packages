import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Tag } from ".";

export default {
  component: Tag,
  title: "Primitives/Tag",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Tag>;

const accordionStoryTemplate: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const Basic = accordionStoryTemplate.bind({});
Basic.args = {
  children: <div>Hello from tag!</div>,
};
