
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { Box } from '.'

export default {
    component: Box,
    title: 'Primitives/Box',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof Box>

const boxStory: ComponentStory<typeof Box> = args => (
    <Box {...args} />
)

export const BoxStory = boxStory.bind({})
BoxStory.args = {
    children: 'Children of block element',
}
