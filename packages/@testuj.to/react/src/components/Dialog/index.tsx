import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import cx from "classnames";

import "./styles.css";

export interface DialogProps {
    hideCloseButton?: boolean;
    isOpen?: boolean;
    className?: string;
    trigger?: React.ReactNode;
    children: React.ReactNode;
    onChange?(isOpen: boolean): void;
}

export const Dialog = ({
    trigger,
    hideCloseButton,
    isOpen,
    className,
    children,
    onChange,
}: DialogProps) => {
    return (
        <RadixDialog.Root
            open={isOpen}
            onOpenChange={onChange}
        >
            {!!trigger && (
                <RadixDialog.Trigger asChild>
                    {trigger}
                </RadixDialog.Trigger>
            )}
            <RadixDialog.Portal>
                <RadixDialog.Overlay className="tt-dialog-overlay" />
                <RadixDialog.Content className={cx("tt-dialog-content", className)}>
                    {children}
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
