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
      title: "New comment",
      description: "Samsung Galaxy Buds 2",
      dateTime: "2023-06-12T08:06:52.532Z",
      type: "info",
    },
    {
      title: "Na napsání recenze zbývá 1 den",
      description: "Samsung Galaxy Buds 2",
      dateTime: "2023-06-12T08:06:52.532Z",
      type: "error",
    },
    {
      title: "Recenze byla úspěšně odeslána",
      description: "Samsung Galaxy Buds 2",
      dateTime: "2023-06-12T08:06:52.532Z",
      type: "success",
    },
    {
      title: "New comment",
      description: "Samsung Galaxy Buds 2",
      dateTime: "2023-06-12T08:06:52.532Z",
      type: "info",
    },
  ],
};
