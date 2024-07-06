import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { HighlightedText } from ".";

export default {
  component: HighlightedText,
  title: "Primitives/HighlightedText",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof HighlightedText>;

const highlightedTextStory: ComponentStory<typeof HighlightedText> = (args) => (
  <div>
    <h1>
      Hello from component! <HighlightedText {...args} />
    </h1>
  </div>
);

export const HighlightedTextStory = highlightedTextStory.bind({});
HighlightedTextStory.args = {
  children: "Highlited text",
};
