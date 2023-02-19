
import { type ReactNode, type ButtonHTMLAttributes } from 'react'
// import PropTypes from 'prop-types'
import cx from 'classnames'

import './styles.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary'|'secondary'
    children?: ReactNode
}

export const Button = ({ variant, ...rest }: ButtonProps) => {
    return (
        <button
            {...rest}
            className={cx('tt-button', variant, rest?.className)}
        />
    )
}

// Button.propTypes = {
//     variant: PropTypes.oneOf([ 'primary', 'secondary' ]),
//     onClick: PropTypes.func,
// }
