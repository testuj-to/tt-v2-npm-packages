import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { NotificationsPopover } from ".";

export default {
  component: NotificationsPopover,
  title: "Composites/NotificationsPopover",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof NotificationsPopover>;

const notificationsPopoverStoryTemplate: ComponentStory<typeof NotificationsPopover> = (args) => (
  <NotificationsPopover {...args} />
);

export const Basic = notificationsPopoverStoryTemplate.bind({});
Basic.args = {
  notifications: [
    {
      label: "Upravit osobní údaje",
      onClick: () => console.log("Upravit osobní údaje"),
    },
    {
      label: "Změnit heslo",
      onClick: () => console.log("Změnit heslo"),
    },
    {
      label: "Změnit profilovou fotografii",
      onClick: () => console.log("Změnit profilovou fotografii"),
    },
    {
      label: "Preference",
      onClick: () => console.log("Preference"),
    },
    {
      label: "Odhlásit se",
      onClick: () => console.log("Odhlásit se"),
    },
  ],
};
