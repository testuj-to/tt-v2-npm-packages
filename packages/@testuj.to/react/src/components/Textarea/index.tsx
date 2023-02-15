
import { type TextareaHTMLAttributes } from 'react'
import cx from 'classnames'

import './styles.css'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea = ({ ...rest }: TextareaProps) => {
    return (
        <textarea
            {...rest}
            className={cx('tt-textarea', rest?.className)}
        />
    )
}
