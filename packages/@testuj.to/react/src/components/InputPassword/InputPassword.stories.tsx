
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { InputPassword } from '.'

export default {
    component: InputPassword,
    title: 'Primitives/InputPassword',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof InputPassword>

const inputStory: ComponentStory<typeof InputPassword> = args => (
    <InputPassword {...args} />
)

export const InputPasswordStory = inputStory.bind({})
InputPasswordStory.args = {
    placeholder: 'Enter your password here',
}
