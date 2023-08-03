import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Modal } from ".";

export default {
  component: Modal,
  title: "Composites/Modal",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof Modal>;

const modalStoryTemplate: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Basic = modalStoryTemplate.bind({});
Basic.args = {
  children: <button>Open me</button>,
  content: <div>Content</div>,
};
