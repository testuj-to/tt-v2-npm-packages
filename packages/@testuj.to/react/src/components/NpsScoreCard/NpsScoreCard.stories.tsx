import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { NpsScoreCard } from ".";

export default {
  component: NpsScoreCard,
  title: "Composites/NpsScoreCard",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof NpsScoreCard>;

const npsScoreStoryTemplate: ComponentStory<typeof NpsScoreCard> = (args) => (
  <div>
    <NpsScoreCard {...args} />
  </div>
);

export const Basic = npsScoreStoryTemplate.bind({});
Basic.args = {
  promoters: 58,
  passives: 48,
  detractors: 31,
};
