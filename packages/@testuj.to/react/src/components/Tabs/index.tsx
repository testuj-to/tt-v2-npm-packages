
import { ReactNode } from 'react'
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs'
import cx from 'classnames'

import './styles.css'

export interface TabsProps {
    defaultKey?: string
    ariaLabel?: string
    tabs: {
        key: string
        label: ReactNode
        content: ReactNode
    }[]
    onChange?(key: string)
}

export const Tabs = ({ defaultKey, ariaLabel, tabs, onChange }: TabsProps) => {
    const _defaultKey = defaultKey || (tabs?.length > 0 ? tabs[0].key : null)

    return (
        <Root
            className={cx('tt-tabs-container')}
            defaultValue={_defaultKey}
            onValueChange={onChange}
        >
            <List
                className={cx('tt-tabs')}
                aria-label={ariaLabel}
            >
                {(tabs || []).map((tab, index) => (
                    <Trigger
                        className={cx('tt-tab')}
                        value={tab?.key}
                    >
                        {tab?.label}
                    </Trigger>
                ))}
            </List>
            {(tabs || []).map((tab, index) => (
                <Content
                    className={cx('tt-tabs-content')}
                    value={tab?.key}
                >
                    {tab?.content}
                </Content>
            ))}
        </Root>
    )
}
