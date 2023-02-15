
import { type InputHTMLAttributes } from 'react'
import cx from 'classnames'

import './styles.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export const Input = ({ ...rest }: InputProps) => {
    return (
        <input
            {...rest}
            className={cx('tt-input', rest?.className)}
        />
    )
}
