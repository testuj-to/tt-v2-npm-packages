
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { Text } from '.'

export default {
    component: Text,
    title: 'Primitives/Text',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof Text>

const textStory: ComponentStory<typeof Text> = args => (
    <Text {...args} />
)

export const TextStory = textStory.bind({})
TextStory.args = {
    children: 'Children of inline element',
}
