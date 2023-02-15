
import { type HTMLAttributes } from 'react'
import cx from 'classnames'

import './styles.css'

export interface TextProps extends HTMLAttributes<HTMLSpanElement> {}
export const Text = ({ ...rest }: TextProps) => {
    return (
        <span
            {...rest}
            className={cx('tt-text', rest?.className)}
        />
    )
}
