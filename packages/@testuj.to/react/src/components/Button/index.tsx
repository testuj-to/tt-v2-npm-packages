
import { type ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

import './styles.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button = ({ ...rest }: ButtonProps) => {
    return (
        <button
            {...rest}
            className={cx('tt-button', rest?.className)}
        />
    )
}
