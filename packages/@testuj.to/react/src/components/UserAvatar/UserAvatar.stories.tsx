import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { UserAvatar } from ".";

export default {
  component: UserAvatar,
  title: "Primitives/UserAvatar",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof UserAvatar>;

const userAvatarStory: ComponentStory<typeof UserAvatar> = (args) => <UserAvatar {...args} />;

export const UserAvatarStory = userAvatarStory.bind({});
UserAvatarStory.args = {
  image: "https://picsum.photos/40/40",
  name: "Jan Novák",
  title: "Super Tester",
  badge: "https://picsum.photos/18/18",
};
