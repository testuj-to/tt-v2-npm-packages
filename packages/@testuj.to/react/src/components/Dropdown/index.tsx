import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";

import "./styles.css";

export interface DropdownProps {
    trigger: React.ReactNode;
    className?: string;
    items?: string[];
    itemsWrapperClassName?: string;
    itemClassName?: string;
    onItemSelect?(item: string): void;
}

export const Dropdown = ({
    trigger,
    className,
    items,
    itemClassName,
    itemsWrapperClassName,
    onItemSelect,
}: DropdownProps) => {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                className={cx("tt-dropdown-trigger", className)}
                asChild
            >
                {trigger}
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className={cx("tt-dropdown-content", itemsWrapperClassName)}
                    sideOffset={5}
                >
                    {items?.map((item) => {
                        let onClick;
                        if (typeof onItemSelect === "function") {
                            onClick = () => onItemSelect(item);
                        }

                        return (
                            <DropdownMenu.Item
                                className={cx("tt-dropdown-item", itemClassName)}
                                onClick={onClick}
                            >
                                {item}
                            </DropdownMenu.Item>
                        );
                    })}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};
