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
    image: <img src="https://test.btcdn.org/img/38875a29b811476d980eaba3d64b3a9e.png" alt="img" />,
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
        id: "2c28gUzlfkPkZKpO8xW75uHSp5t",
        state: "closed",
        slug: "timeline",
        name: "Timeline",
        thumbnailImage: {
            src: "https://test.btcdn.org/img/38875a29b811476d980eaba3d64b3a9e.png",
        },
        images: [
            {
                file: {
                    id: "38875a29b811476d980eaba3d64b3a9e",
                    src: "https://test.btcdn.org/img/38875a29b811476d980eaba3d64b3a9e.png",
                },
                isThumbnail: null,
            },
        ],
        campaignApplication: {
            id: "2c2FnisbWzmqwuvxsbxXO2G8rbU",
            state: "resolved",
            submittedAt: null,
            isDelivered: null,
            latestResolution: {
                status: "selected",
                resolvedAt: 1707305067017,
                message: null,
            },
        },
        reviews: [],
        products: [
            {
                category: {
                    key: "health-and-beauty",
                },
                id: "2ZMok7mHmh9u8eFrj6ZVawWZzl7",
                image: {
                    src: "https://test.btcdn.org/img/b080ae2fee6744a89f85d0ff17911464.png",
                    id: "b080ae2fee6744a89f85d0ff17911464",
                },
                info: {
                    manufacturer: null,
                    model: null,
                },
                name: "Aplikace KucKuc",
                urlAddress: null,
            },
            {
                category: {
                    key: "health-and-beauty",
                },
                id: "2Vz3hbcnhyLAVxtjUjeN7mswYcn",
                image: {
                    src: "https://test.btcdn.org/p/2Vz3hbcnhyLAVxtjUjeN7mswYcn/354dcd9e-3e26-47b8-aeed-6a6cdca006eb.jpg",
                    id: "354dcd9e-3e26-47b8-aeed-6a6cdca006eb",
                },
                info: {
                    manufacturer: {
                        logo: null,
                        id: "2WVfX439q7PcISeL13Ui0E8iey6",
                        name: "Krémy.cz",
                    },
                    model: null,
                },
                name: "Opalovací krém",
                urlAddress: null,
            },
            {
                category: {
                    key: "health-and-beauty",
                },
                id: "2Wic0Wq7ZoVJMewfpkyr2LYNKSl",
                image: {
                    src: "https://test.btcdn.org/p/2Wic0Wq7ZoVJMewfpkyr2LYNKSl/e12485bb-0b8f-41a8-886c-f379e2c07ade.jpeg",
                    id: "e12485bb-0b8f-41a8-886c-f379e2c07ade",
                },
                info: {
                    manufacturer: {
                        logo: null,
                        id: "2WVfX2jWIvdn2VCKMdfECdPtgfO",
                        name: "Orel",
                    },
                    model: "Jedlý",
                },
                name: "Vincentka",
                urlAddress: null,
            },
        ],
        settings: {
            capacity: 4,
            openAt: 1707300000000,
            registrationPeriodDays: 2,
            submissionPeriodDays: 1,
            closeAt: 1707523200000,
        },
        tags: [],
        tenantLogo: null,
    },
    t: (key: string, args?: any) => key,
};
