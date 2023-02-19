
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { RadioGroup } from '.'

export default {
    component: RadioGroup,
    title: 'Primitives/RadioGroup',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof RadioGroup>

const radioGroupStory: ComponentStory<typeof RadioGroup> = args => (
    <RadioGroup {...args} />
)

export const RadioGroupStory = radioGroupStory.bind({})
RadioGroupStory.args = {
    options: [{
        value: 'a',
        label: 'Option A',
    }, {
        value: 'b',
        label: 'Option B',
    }],
}
