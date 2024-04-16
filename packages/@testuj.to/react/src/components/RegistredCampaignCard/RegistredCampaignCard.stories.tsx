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
    image: <img src="https://test.btcdn.org/img/14282961ed144a01802f1c0bf60e0824.png" alt="img" />,
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
        id: "2bWUq9aR6EOkTu9wutGOWViN8Sh",
        state: "opened",
        slug: "test-due-5",
        name: "Test due 5",
        thumbnailImage: {
            src: "https://test.btcdn.org/img/63866325d3964592b4d8c418fce7478b.png",
        },
        images: [
            {
                file: {
                    id: "63866325d3964592b4d8c418fce7478b",
                    src: "https://test.btcdn.org/img/63866325d3964592b4d8c418fce7478b.png",
                },
                isThumbnail: null,
            },
        ],
        mainTenant: {
            domainName: "test.testuj.to",
            id: "cz",
            locale: "cs",
            logo: {
                id: "5d08457478c04f1ea2ec2993f16717f2",
                presignedUploadUrl: null,
                src: "https://test.btcdn.org/img/5d08457478c04f1ea2ec2993f16717f2.png",
            },
            name: "Testuj.to",
        },
        campaignApplication: {
            id: "2dx3t745DvMJpzc0L9IN5HUX4LT",
            state: "resolved",
            submittedAt: null,
            isDelivered: true,
            latestResolution: {
                status: "selected",
                resolvedAt: 1712373362852,
                message: null,
            },
        },
        reviews: [],
        products: [
            {
                category: {
                    key: "sport",
                },
                id: "2Wbqo69lmbUAepa6vJofAIeP0re",
                image: {
                    src: "https://test.btcdn.org/p/2Wbqo69lmbUAepa6vJofAIeP0re/97d67eab-e5ff-495f-8474-d4e1f0383110.jpg",
                    id: "97d67eab-e5ff-495f-8474-d4e1f0383110",
                },
                info: {
                    manufacturer: {
                        logo: null,
                        id: "0q7B7nvq4SjX4oqGbH0BtnKvaks",
                        name: "Novy vyrobc",
                    },
                    model: "KS900",
                },
                name: "Běžecké boty Kiprun KS900",
                urlAddress: null,
            },
            {
                category: {
                    key: "house-and-garden-cleaning-supplies",
                },
                id: "2edRksO44wj6LSq4w6HZ67JegvV",
                image: {
                    src: "https://test.btcdn.org/img/cefbee881ba943149d168365dc1150aa.png",
                    id: "cefbee881ba943149d168365dc1150aa",
                },
                info: {
                    manufacturer: {
                        logo: null,
                        id: "2WVfX439q7PcISeL13Ui0E8iey6",
                        name: "Krémy.cz",
                    },
                    model: "SX6",
                },
                name: "Dettol",
                urlAddress: null,
            },
        ],
        settings: {
            capacity: 10,
            openAt: 1706310000000,
            registrationPeriodDays: 3,
            submissionPeriodDays: 1,
            closeAt: 1706569200000,
        },
        tags: [
            {
                key: "87gczp9u6ty",
                value: "Lidi",
            },
        ],
        tenantLogo: null,
    },
    t: (key: string, args?: any) => key,
};
