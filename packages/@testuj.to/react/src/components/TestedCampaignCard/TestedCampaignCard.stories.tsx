import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { TestedCampaignCard } from ".";

export default {
  component: TestedCampaignCard,
  title: "Composites/TestedCampaignCard",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof TestedCampaignCard>;

const testedCampaignCardStoryTemplate: ComponentStory<typeof TestedCampaignCard> = (args) => (
  <TestedCampaignCard {...args} />
);

export const Basic = testedCampaignCardStoryTemplate.bind({});
Basic.args = {
  image: <img src="https://picsum.photos/384/264" alt="img" />,
  label: "Product title",
  tags: [
    {
      children: "👌 40% SLEVA",
      variant: "white",
    },
    {
      children: "Probíhá přihlašování",
      variant: "warning",
      color: "#FFC107",
    },
  ],
  onClick: () => console.log("Product card clicked"),
  info: {
    rating: Math.random() * 5,
    noOfReviews: Math.floor(Math.floor(Math.random() * 100)),
    date: new Date().toISOString(),
  },
  showInfo: true,
  translations: {
    review: "recenze",
    reviews: "recenzí",
  },
};
