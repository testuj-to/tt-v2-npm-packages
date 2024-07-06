import React, { type TextareaHTMLAttributes } from "react";
import cx from "classnames";

import "./styles.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ ...rest }, ref) => {
    return (
        <textarea
            {...rest}
            ref={ref}
            className={cx("tt-textarea", rest?.className)}
        />
    );
});
