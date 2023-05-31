import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { CampaignHeroSection } from ".";

export default {
  component: CampaignHeroSection,
  title: "Composites/CampaignHeroSection",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof CampaignHeroSection>;

const campaignHeroSectionStoryTemplate: ComponentStory<typeof CampaignHeroSection> = (args) => (
  <CampaignHeroSection {...args} />
);

export const Basic = campaignHeroSectionStoryTemplate.bind({});
Basic.args = {
  children: "Click me",
  // onClick: () =>
  //     alert('You clicked me!'),
};
