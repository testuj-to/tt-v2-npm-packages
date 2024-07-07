
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { SelectDate } from '.'

export default {
    component: SelectDate,
    title: 'Primitives/SelectDate',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof SelectDate>

const selectDateStory: ComponentStory<typeof SelectDate> = args => (
    <SelectDate {...args} />
)

export const SelectDateStory = selectDateStory.bind({})
SelectDateStory.args = {}
