import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";

import "./styles.css";

export interface DropdownProps {
  trigger: React.ReactNode;
  className?: string;
  items?: string[];
  onItemSelect?: (item: string) => void;
  itemsWrapperClassName?: string;
  itemClassName?: string;
}

export const Dropdown = ({
  trigger,
  className,
  items,
  onItemSelect,
  itemClassName,
  itemsWrapperClassName,
}: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className={cx("tt-dropdown-trigger", className)}>
        {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cx("tt-dropdown-content", itemsWrapperClassName)}
          sideOffset={5}
        >
          {items?.map((item) => (
            <DropdownMenu.Item
              className={cx("tt-dropdown-item", itemClassName)}
              onClick={onItemSelect ? () => onItemSelect(item) : undefined}
            >
              {item}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
