
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { Dropdown } from '.'

export default {
    component: Dropdown,
    title: 'Primitives/Dropdown',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof Dropdown>

const dropdownStory: ComponentStory<typeof Dropdown> = args => (
    <Dropdown {...args} />
)

export const DropdownStory = dropdownStory.bind({})
DropdownStory.args = {}
