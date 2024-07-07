import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { ProgressBar } from ".";

export default {
    component: ProgressBar,
    title: "Primitives/ProgressBar",
    parameters: {
        layout: "centered",
    },
    decorators: [TTContextDecorator],
} as ComponentMeta<typeof ProgressBar>;

const progressBarStory: ComponentStory<typeof ProgressBar> = (args) => (
    <div style={{ width: "400px" }}>
        <ProgressBar {...args} />
    </div>
);

export const ProgressBarStory = progressBarStory.bind({});
ProgressBarStory.args = {
    value: 80,
    breakpoints: [
        20,
        40,
        60,
        {
            value: 80,
            component: <div>🎉</div>,
            componentSuccess: <div>😊</div>,
            tooltip: "Almoste there 🎉",
        },
        {
            value: 100,
            component: <div>🎉</div>,
            componentSuccess: <div>😊</div>,
            tooltip: "You did it! 🎉",
        },
    ],
    // finalIcon: <div>🎉</div>,
};
