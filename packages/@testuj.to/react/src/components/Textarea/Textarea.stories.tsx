
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { Textarea } from '.'

export default {
    component: Textarea,
    title: 'Primitives/Textarea',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof Textarea>

const textareaStory: ComponentStory<typeof Textarea> = args => (
    <Textarea {...args} />
)

export const TextareaStory = textareaStory.bind({})
TextareaStory.args = {
    placeholder: 'Some long text here...',
}
