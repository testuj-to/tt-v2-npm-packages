import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import cx from "classnames";

import "./styles.css";

export interface DialogProps {
    content: React.ReactNode;
    hideCloseButton?: boolean;
    open?: boolean;
    className?: string;
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
}

export const Dialog = ({
    content,
    hideCloseButton,
    open,
    className,
    children,
    onOpenChange,
}: DialogProps) => {
    return (
        <RadixDialog.Root
            open={open}
            onOpenChange={onOpenChange}
        >
            <RadixDialog.Trigger asChild>
                {children}
            </RadixDialog.Trigger>
            <RadixDialog.Portal>
                <RadixDialog.Overlay className="tt-dialog-overlay" />
                <RadixDialog.Content className={cx("tt-dialog-content", className)}>
                    {content}
                    {!hideCloseButton && (
                        <RadixDialog.Close asChild>
                            <button className="tt-dialog-icon-button" aria-label="Close">
                                <Cross2Icon/>
                            </button>
                        </RadixDialog.Close>
                    )}
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
};
