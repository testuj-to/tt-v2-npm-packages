import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { ReviewComponent } from ".";

export default {
  component: ReviewComponent,
  title: "Composites/ReviewComponent",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof ReviewComponent>;

const reviewComponentStoryTemplate: ComponentStory<typeof ReviewComponent> = (args) => (
  <ReviewComponent {...args} />
);

export const Basic = reviewComponentStoryTemplate.bind({});
Basic.args = {
  user: {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    title: "Senior Tester",
  },
  rating: 4.3,
  content:
    "Fantastický produkt pro péči o vlasy. Obsahuje přírodní složky, jako jsou extrakty z bylin a vitamíny, které pomáhají regenerovat vlasy a zlepšit jejich celkovou kvalitu. Vlasy jsou po použití tohoto produktu hydratované, zdravé a lesklé. Určitě doporučuji!",
  createdAt: "2021-05-01T12:00:00.000Z",
  pros: ["Přírodní složení", "Vhodné pro všechny typy vlasů", "Příjemná vůně"],
  cons: ["Vysoká cena", "Nedostupnost v kamenných prodejnách"],
  recommend: true,
  images: [
    "https://images.unsplash.com/photo-1688955665338-fb430ff8436d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=950&q=80",
  ],
  recommendedText: "doporučuje",
};
