import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import cx from "classnames";

import "./styles.css";

export interface TooltipProps {
    children?: React.ReactNode;
    content?: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    delayDuration?: number;
    disableHoverableContent?: boolean;
    className?: string;
    contentClassName?: string;
    onOpenChange?(open: boolean): void;
}

export const Tooltip = ({
    children,
    content,
    open,
    defaultOpen,
    onOpenChange,
    delayDuration,
    disableHoverableContent,
    className,
    contentClassName,
}: TooltipProps) => {
    return (
        <RadixTooltip.Provider
            disableHoverableContent={disableHoverableContent}
            delayDuration={delayDuration}
        >
            <RadixTooltip.Root
                defaultOpen={defaultOpen}
                open={open}
                onOpenChange={onOpenChange}
            >
                <RadixTooltip.Trigger
                    className={cx(className)}
                    asChild
                >
                    {children}
                </RadixTooltip.Trigger>
                <RadixTooltip.Portal>
                    <RadixTooltip.Content
                        className={cx("tt-tooltip-content", contentClassName)}
                        sideOffset={5}
                    >
                        {content}
                    </RadixTooltip.Content>
                </RadixTooltip.Portal>
            </RadixTooltip.Root>
        </RadixTooltip.Provider>
    );
};
