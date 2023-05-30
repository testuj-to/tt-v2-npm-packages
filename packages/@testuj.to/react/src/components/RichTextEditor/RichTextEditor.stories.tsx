import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { RichTextEditor } from ".";

export default {
  component: RichTextEditor,
  title: "Primitives/RichTextEditor",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof RichTextEditor>;

const richTextEditorStory: ComponentStory<typeof RichTextEditor> = (args) => (
  <RichTextEditor {...args} />
);

export const RichTextEditorStory = richTextEditorStory.bind({});
RichTextEditorStory.args = {};
