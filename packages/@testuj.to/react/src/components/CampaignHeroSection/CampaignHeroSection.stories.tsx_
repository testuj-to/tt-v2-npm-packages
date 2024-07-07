import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { CampaignHeroSection } from ".";

export default {
  component: CampaignHeroSection,
  title: "Composites/CampaignHeroSection",
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof CampaignHeroSection>;

const campaignHeroSectionStoryTemplate: ComponentStory<typeof CampaignHeroSection> = (args) => (
  <div>
    <CampaignHeroSection {...args} />
  </div>
);

export const Basic = campaignHeroSectionStoryTemplate.bind({});
Basic.args = {
  t: (key: string) => key,
  image: <img src="https://picsum.photos/1920/1080" alt="img" />,
  data: {
    id: "63a4f1674c5d625e5e3f3011",
    createdBy: {
      id: "63732cb4919eee473ec5cec7",
      type: "admin",
      admin: {
        id: "63732cb4919eee473ec5cec7",
        cognitoId: "",
      },
    },
    outcome: {
      includeImages: true,
      includeVideo: true,
      includeSocialPosts: true,
      noOfReviews: 10,
    },
    createdAt: "2022-12-23T00:08:07.639Z",
    tenants: [
      {
        id: "636ad8dd185b079cf4cc3014",
        createdBy: {
          id: "000000000000000000000000",
          type: "",
        },
        createdAt: "0001-01-01T00:00:00Z",
        name: "",
        domains: null,
      },
    ],
    products: [
      {
        id: "637dc776a41e2c26815e620f",
        createdBy: {
          id: "63732cb4919eee473ec5cec7",
          type: "admin",
          admin: {
            id: "63732cb4919eee473ec5cec7",
            cognitoId: "",
          },
        },
        createdAt: "2022-11-23T07:10:46.073Z",
        categories: [
          {
            id: "63ca875376a857606495c965",
            createdBy: {
              id: "000000000000000000000000",
              type: "",
            },
            createdAt: "0001-01-01T00:00:00Z",
            parentId: null,
            name: null,
          },
        ],
        name: {
          cs: "PAP Bělící pásky na zuby",
        },
        manufacturer: "Hello Coco",
        model: "PAP",
        image: null,
      },
    ],
    status: "opened",
    isVisible: true,
    isSecret: false,
    name: "PAP Bělící pásky na zuby",
    openAt: "0001-01-01T00:00:00Z",
    hasAutoOpen: true,
    applications: {
      slotsCount: 50,
      registrationPeriodDays: 14,
      submissionPeriodDays: 7,
      hasAutoProlongRegistration: true,
      questionnaire: {
        id: "63a4f2004c5d625e5e3f3012",
        createdBy: {
          id: "000000000000000000000000",
          type: "",
        },
        createdAt: "0001-01-01T00:00:00Z",
        tenant: null,
        campaign: null,
        type: "",
        name: "",
        questions: null,
      },
    },
    web: {
      slug: "belici-pasky-na-zuby",
      title: "Bělící pásky na zuby od HELLO COCO vám umožní snadno a efektivně vybělit zuby",
      description: {
        json: '{"blocks":[{"key":"3i2o4","text":"Odstraňujeme skvrny, bez citlivosti zubů.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":41,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"2pm82","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8a9bm","text":"Bělící pásky na zuby vám umožní si snadno a efektivně vybělit zuby a zbavit se nevzhledných skvrn na zubní sklovině z pohodlí domova. Na základě našeho bělícího vzorce PAP jsme navrhli proužky jako náš doposud nejpohodlnější způsob bělení.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":35,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ei2ch","text":"Tradiční bělící pásky používají složení na bázi peroxidu, které může vyvolat citlivost zubů. Hello coco PAP pásky místo toho využívají recepturu založenou na PAP bez citlivosti.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":158,"length":19,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"1ass","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"25aev","text":"Více informací o produktu najdete TADY.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":39,"style":"BOLD"}],"entityRanges":[{"offset":34,"length":4,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://www.hellococo.cz/belici-pasky-na-zuby/","rel":"noreferrer noopener","target":"_blank","url":"https://www.hellococo.cz/belici-pasky-na-zuby/"}}}}',
      },
      criteria: {
        json: '{"blocks":[{"key":"7mijt","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      },
    },
    images: [],
    discount: 60,
  },
  button: {
    text: "Register",
    variant: "success",
    onClick: () => {},
  },
};
