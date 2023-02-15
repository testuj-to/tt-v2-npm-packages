
import { Root, Item, Indicator } from '@radix-ui/react-radio-group'
import cx from 'classnames'

import './styles.css'

export interface RadioGroupProps<Value> {
    ariaLabel?: string
    options: {
        label: string
        value: Value
    }[]
    value: Value
    onChange?(value: Value)
}

export const RadioGroup = <Value extends string = string>({ options, value, ariaLabel, onChange }: RadioGroupProps<Value>) => {
    return (
        <Root
            className={cx('tt-radio-group')}
            value={value}
            aria-label={ariaLabel}
            onValueChange={onChange}
        >
            {options.map((option, index) => (
                <div
                    key={`${index}${option?.value}`}
                    className={cx('tt-radio')}
                >
                    <Item
                        className={cx('tt-radio-item')}
                        id={`${index}${option.value}`}
                        value={option.value}
                    >
                        <Indicator className={cx('tt-radio-indicator')} />
                    </Item>
                    <label
                        className={cx('tt-radio-label')}
                        htmlFor={`${index}${option.value}`}
                    >
                        {option.label}
                    </label>
                </div>
            ))}
        </Root>
    )
}
