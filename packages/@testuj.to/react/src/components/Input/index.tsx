
import React, { type InputHTMLAttributes } from 'react'
import cx from 'classnames'

import './styles.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'dark'
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({variant, className, ...rest }, innerRef) => {
    return (
        <input
            ref={innerRef}
            {...rest}
            className={cx('tt-input', {"tt-input-dark": variant === "dark"} ,className)}
        />
    )
})
