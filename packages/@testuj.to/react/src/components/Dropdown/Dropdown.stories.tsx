
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
DropdownStory.args = {
    trigger: <div>Trigger</div>,
    items: ['Item 1', 'Item 2', 'Item 3'],
    onItemSelect: (item: string) => console.log(item),
    
}
