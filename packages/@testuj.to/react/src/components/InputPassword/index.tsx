
import {
    type InputHTMLAttributes,
    useState,
    useCallback,
} from 'react'
import cx from 'classnames'

import './styles.css'

export interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {}
export const InputPassword = ({ ...rest }: InputPasswordProps) => {
    const [ isVisible, setIsVisible ] = useState(false)
    const toggleIsVisible = useCallback(() => setIsVisible(isVisible => !isVisible), [])

    return (
        <input
            {...rest}
            type={isVisible ? 'text' : 'password'}
            className={cx('tt-input-password', rest?.className)}
        />
    )
}
