import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { Checkbox } from ".";

export default {
    component: Checkbox,
    title: "Primitives/Checkbox",
    parameters: {
        layout: "centered",
    },
    decorators: [TTContextDecorator],
} as ComponentMeta<typeof Checkbox>;

const checkboxStory: ComponentStory<typeof Checkbox> = (args) => (
    <div style={{ maxWidth: "200px" }}>
        <Checkbox {...args} />
    </div>
);

export const CheckboxStory = checkboxStory.bind({});
CheckboxStory.args = {
    label: "Ahoj já jsem velmi dloyhý text bla bla bla, Ahoj já jsem velmi dloyhý text bla bla bla ",
    variant: "outlined",
};
