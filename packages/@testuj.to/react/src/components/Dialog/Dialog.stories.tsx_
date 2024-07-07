import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Dialog } from ".";

export default {
  component: Dialog,
  title: "Primitives/Dialog",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Dialog>;

const dialogStoryTemplate: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Basic = dialogStoryTemplate.bind({});
Basic.args = {
  children: <button>Open me</button>,
  content: <div style={{ width: "200px", height: "200px", backgroundColor: "red" }}>Content</div>,
  onOpenChnage: (open) => console.log(open),
};
