import { useEffect, useState } from "react";
import { Button, type ButtonProps } from "../Button";
import { Spinner } from "./Spinner";

import "./styles.css";

export interface SaveButtonProps extends ButtonProps {
    finalChildren?: React.ReactNode;
    isLoading?: boolean;
    isSuccessful?: boolean;
    saveTimeout?: number;
}

export const SaveButton = ({children, finalChildren, isLoading, isSuccessful, saveTimeout, ...props}: SaveButtonProps) => {
    const [isSaved, setIsSaved] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccessful) {
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), saveTimeout || 1000);
        }

        return () => setIsSaved(false);
    }, [isSuccessful, saveTimeout]);

    const finalChildrenToRender = isSaved ? finalChildren : children;

    if (isLoading) {
        return <Button {...props} disabled={true} ><Spinner /></Button>;
    }
    
  return <Button {...props} >{finalChildrenToRender}</Button>;
};
