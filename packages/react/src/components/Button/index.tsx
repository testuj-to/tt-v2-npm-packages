
import { type ButtonHTMLAttributes } from 'react'

import './styles.css'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button = ({ ...rest }: ButtonProps) => {
    return (
        <button
            {...rest}
            className={`tt-button${rest?.className ? ` ${rest.className}` : ''}`}
        />
    )
}
