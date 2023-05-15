import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { HighlitedText } from ".";

export default {
  component: HighlitedText,
  title: "Primitives/HighlitedText",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof HighlitedText>;

const highlitedTextStory: ComponentStory<typeof HighlitedText> = (args) => (
  <div>
    <h1>
      Hello from component! <HighlitedText {...args} />
    </h1>
  </div>
);

export const HighlitedTextStory = highlitedTextStory.bind({});
HighlitedTextStory.args = {
  children: "Highlited text",
};
