
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { FormItem } from '.'

export default {
    component: FormItem,
    title: 'Primitives/FormItem',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof FormItem>

const formItemStory: ComponentStory<typeof FormItem> = args => (
    <FormItem {...args} />
)

export const FormItemStory = formItemStory.bind({})
FormItemStory.args = {
    label: 'Some label',
    children: <>Some children here</>,
}
