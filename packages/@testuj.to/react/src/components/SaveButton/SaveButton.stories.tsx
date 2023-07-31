import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { SaveButton } from '.'

export default {
    component: SaveButton,
    title: 'Primitives/SaveButton',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof SaveButton>

const saveButtonStoryTemplate: ComponentStory<typeof SaveButton> = args => (
    <SaveButton {...args} />
)

export const Basic = saveButtonStoryTemplate.bind({})
Basic.args = {
    children: 'Click me',
    // onClick: () =>
    //     alert('You clicked me!'),
}
