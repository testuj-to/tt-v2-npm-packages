
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TTContextDecorator } from '../../context.stories'
import { Table } from '.'

export default {
    component: Table,
    title: 'Primitives/Table',
    parameters: {
        layout: 'centered',
    },
    decorators: [
        TTContextDecorator,
    ],
} as ComponentMeta<typeof Table>

const tableStory: ComponentStory<typeof Table> = args => (
    <Table {...args} />
)

export const TableStory = tableStory.bind({})
TableStory.args = {
    columns: [{
        key: 'id',
        title: 'ID',
        render(row) {
            return row?.id
        },
    }, {
        key: 'name',
        title: 'Name',
        render(row) {
            return row?.name
        },
    }, {
        key: 'address',
        title: 'Address',
        render(row) {
            return row?.address
        },
    }],
    data: [{
        id: 0,
        name: 'John Doe',
        address: 'Nowhere 123, Czech republic',
    }, {
        id: 1,
        name: 'Jane Foe',
        address: 'Somehere 963, Not czech republic',
    }],
}
