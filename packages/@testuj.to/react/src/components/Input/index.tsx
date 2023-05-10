
import React, { type InputHTMLAttributes } from 'react'
import cx from 'classnames'

import './styles.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...rest }, innerRef) => {
    return (
        <input
            ref={innerRef}
            {...rest}
            className={cx('tt-input', className)}
        />
    )
})
