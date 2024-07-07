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
Basic.args = {
  user: {
    image: "https://picsum.photos/40/40",
    name: "Jan Novák",
    title: "Super Tester",
    badge: "https://picsum.photos/18/18",
  },
  xpBar: {
    value: 65,
    breakpoints: [20, 40, 60, 80],
  },
  menuItems: [
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
