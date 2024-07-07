import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Tooltip } from ".";

export default {
    component: Tooltip,
    title: "Primitives/Tooltip",
    parameters: {
        layout: "centered",
    },
    decorators: [TTContextDecorator],
} as ComponentMeta<typeof Tooltip>;

const tooltipStory: ComponentStory<typeof Tooltip> = (args) => (
    <div style={{ width: "400px" }}>
        <Tooltip {...args} />
    </div>
);

export const TooltipStory = tooltipStory.bind({});
TooltipStory.args = {
    content: "Hello, I am a tooltip",
    children: <button>Hover me</button>,
    defaultOpen: true,
    delayDuration: 200,
    disableHoverableContent: true,
};
