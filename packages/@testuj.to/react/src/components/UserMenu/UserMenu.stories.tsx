import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { UserMenu } from ".";

export default {
  component: UserMenu,
  title: "Composites/UserMenu",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof UserMenu>;

const userMenuStoryTemplate: ComponentStory<typeof UserMenu> = (args) => <UserMenu {...args} />;

export const Basic = userMenuStoryTemplate.bind({});
Basic.args = {};
