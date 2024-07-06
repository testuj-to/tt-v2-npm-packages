import { CSSProperties, ReactNode } from "react";
import cx from "classnames";

import "./styles.css";

export interface FormItemProps {
    label?: ReactNode
    htmlFor?: string
    style?: CSSProperties
    children?: ReactNode
}

export const FormItem = ({ label, htmlFor, style, children }: FormItemProps) => {
    return (
        <div
            className={cx('tt-formitem-container')}
            style={style}
        >
            {label && (
                <label
                    className={cx('tt-formitem-label')}
                    htmlFor={htmlFor}
                >
                    {label}
                </label>
            )}
            {children}
        </div>
    )
}
