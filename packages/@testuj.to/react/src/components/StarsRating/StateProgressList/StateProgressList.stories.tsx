import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../../context.stories";
import { StateProgressList } from ".";

export default {
  component: StateProgressList,
  title: "Primitives/StateProgressList",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof StateProgressList>;

const stateProgressListStory: ComponentStory<typeof StateProgressList> = (args) => (
  <StateProgressList {...args} />
);

export const StateProgressListStory = stateProgressListStory.bind({});
StateProgressListStory.args = {
  items: [
    { state: "active", content: "First step" },
    { state: "done", content: "Second step" },
    { state: "disabled", content: "Third step" },
    { state: "error", content: "Fourth step" },
  ],
  currentIndex: 1,
  pastSuccess: true,
};
