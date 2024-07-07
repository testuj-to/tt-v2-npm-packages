
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { ToastProvider, Toast } from '.'

export default {
    component: Toast,
    title: 'Primitives/Toast',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof Toast>

const toastStory: ComponentStory<typeof Toast> = args => (
    <ToastProvider>
        <Toast {...args} />
    </ToastProvider>
)

export const ToastStory = toastStory.bind({})
ToastStory.args = {
    title: 'This is a toast',
    description: [
        'With some ',
        <strong key='bold'>important</strong>,
        ' description as well',
    ],
}
