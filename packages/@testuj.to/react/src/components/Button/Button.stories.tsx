
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { Button } from '.'

export default {
    component: Button,
    title: 'Primitives/Button',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof Button>

const buttonStoryTemplate: ComponentStory<typeof Button> = args => (
    <Button {...args} />
)

export const Basic = buttonStoryTemplate.bind({})
Basic.args = {
    children: 'Click me',
    // onClick: () =>
    //     alert('You clicked me!'),
}
