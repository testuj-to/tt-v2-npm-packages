
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { Tabs } from '.'

export default {
    component: Tabs,
    title: 'Primitives/Tabs',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof Tabs>

const tabsStory: ComponentStory<typeof Tabs> = args => (
    <Tabs {...args} />
)

export const TabsStory = tabsStory.bind({})
TabsStory.args = {
    defaultKey: 'a',
    tabs: [{
        key: 'a',
        label: 'Tab A',
        content: 'Content of tab A',
    }, {
        key: 'b',
        label: 'Tab B',
        content: 'Content of tab B',
    }, {
        key: 'c',
        label: 'Tab C',
        content: 'Content of tab C',
    }],
}
