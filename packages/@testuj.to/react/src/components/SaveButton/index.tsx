import { forwardRef, useEffect, useState } from "react";
import cx from "classnames";

import "./styles.css";

import { Button, type ButtonProps } from "../Button";
import { Spinner } from "./Spinner";

export interface SaveButtonProps extends ButtonProps {
    finalChildren?: React.ReactNode;
    errorChildren?: React.ReactNode;
    isLoading?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    saveTimeout?: number;
}

export const SaveButton = forwardRef<HTMLButtonElement>(({
    children,
    finalChildren,
    errorChildren,
    isLoading,
    isSuccess,
    isError,
    saveTimeout,
    className,
    ...props
}: SaveButtonProps, ref) => {
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), saveTimeout || 1000);
        }

        return () => setIsSaved(false);
    }, [isSuccess, saveTimeout]);

    const finalChildrenToRender = () =>  {
        if (isSaved) {
            return finalChildren || children;
        }

        if (isError) {
            return errorChildren || children;
        }

        return children;
    }

    const buttonState = () => {
        if (isSaved) {
            return "success";
        }

        if (isError) {
            return "error";
        }

        return "default";
    }

    if (isLoading) {
        return (
            <Button
                {...props}
                ref={ref}
                className={cx("tt-save-button", className)}
            >
                <Spinner/>
            </Button>
        );
    }

    return (
        <Button
            {...props}
            ref={ref}
            className={cx("tt-save-button", buttonState(), className)}
        >
            {finalChildrenToRender()}
        </Button>
    );
});
