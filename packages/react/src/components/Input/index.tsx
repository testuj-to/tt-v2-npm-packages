
import { type InputHTMLAttributes } from 'react'

import './styles.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export const Input = ({ ...rest }: InputProps) => {
    return (
        <input
            {...rest}
            className={`tt-input${rest.className ? ` ${rest.className}` : ''}`}
        />
    )
}
