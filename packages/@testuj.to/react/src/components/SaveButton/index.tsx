import { useEffect, useState } from "react";
import cx from "classnames";
import { Button, type ButtonProps } from "../Button";
import { Spinner } from "./Spinner";

import "./styles.css";

export interface SaveButtonProps extends ButtonProps {
    finalChildren?: React.ReactNode;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    saveTimeout?: number;
}

export const SaveButton = ({children, finalChildren, isLoading, isSuccess, isError, saveTimeout, className, ...props}: SaveButtonProps) => {
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), saveTimeout || 1000);
        }

        return () => setIsSaved(false);
    }, [isSuccess, saveTimeout]);

    const finalChildrenToRender = isSaved ? finalChildren : children;

    const buttonState = () => {
        if (isSuccess) {
            return "success";
        }

        if (isError) {
            return "error";
        }

        return "default";
    }

    if (isLoading) {
        return <Button {...props} disabled={true} className="tt-save-button.info" ><Spinner /></Button>;
    }
    
  return <Button {...props} className={cx("tt-save-button", buttonState(), className)}  >{finalChildrenToRender}</Button>;
};
