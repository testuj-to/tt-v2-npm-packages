import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { RegistredCampaignCard } from ".";

export default {
  component: RegistredCampaignCard,
  title: "Composites/RegistredCampaignCard",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof RegistredCampaignCard>;

const registredcampaignCardStoryTemplate: ComponentStory<typeof RegistredCampaignCard> = (args) => (
  <RegistredCampaignCard {...args} />
);

export const Basic = registredcampaignCardStoryTemplate.bind({});
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
  campaign: {
    settings: {
      // openAt: today - 1 week as iso string
      openAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      registrationPeriodDays: 2,
      submissionPeriodDays: 3,
    },
    campaignApplication: {
      state: "resolved",
      submittedAt: null,
      isDelivered: true,
      id: "2X9yAmK0ffaw2HxhCULVssFoCAT",
      discountCode: null,
      deliveryConfirmedAt: 1698058333514,
      questionnaireResponse: null,
      latestResolution: {
        message: null,
        resolvedAt: 1698055585172,
        status: "selected",
      },
    },
    reviews: [
      {
        state: "draft",
        id: "2X9yAmK0ffaw2HxhCULVssFoCAT",
      },
    ],
  },
  t: (key: string, args?: any) => key,
};
