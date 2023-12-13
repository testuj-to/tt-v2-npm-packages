import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";

import "./styles.css";
import { useState } from "react";
import { CheckIcon, TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";

export interface SelectItem {
  label: string;
  value: string;
}

export interface DropdownSelectProps {
  triggerLabel: string;
  items: SelectItem[];
  onSelectionChange?: (items: SelectItem[]) => void;
  selectedItemsProps?: SelectItem[];
  className?: string;
}

export const DropdownSelect = ({
  triggerLabel,
  items,
  onSelectionChange,
  selectedItemsProps,
  className,
}: DropdownSelectProps) => {
  const [selectedItemsLocal, setSelectedItemsLocal] = useState<SelectItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const selectedItems = selectedItemsProps || selectedItemsLocal;

  const isChecked = (item: SelectItem) =>
    selectedItems.some((selectedItem) => selectedItem.value === item.value);

  const handleCheckItem = (item: SelectItem) => {
    const itemIndex = selectedItems.findIndex((selectedItem) => selectedItem.value === item.value);
    const newSelectedItems = [...selectedItems];

    if (itemIndex === -1) {
      newSelectedItems.push(item);
    } else {
      newSelectedItems.splice(itemIndex, 1);
    }

    setSelectedItemsLocal(newSelectedItems);
    onSelectionChange?.(newSelectedItems);
  };

  return (
    <DropdownMenu.Root onOpenChange={(e) => setIsOpen(e)}>
      <DropdownMenu.Trigger asChild className={className}>
        <button className="tt-dropdownSelect-trigger" aria-label="Customise options">
          {triggerLabel}
          {selectedItems.length ? (
            <div className="tt-dropdownSelect-counter">{selectedItems.length}</div>
          ) : null}
          {isOpen ? (
            <TriangleUpIcon className="tt-dropdownSelect-trigger-icon" />
          ) : (
            <TriangleDownIcon className="tt-dropdownSelect-trigger-icon" />
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="tt-dropdownSelect-content"
          align="start"
          sideOffset={5}
          loop
        >
          {items?.map((item: SelectItem) => (
            <DropdownMenu.CheckboxItem
              key={item.value}
              className="tt-dropdownSelect-item"
              checked={isChecked(item)}
              onSelect={(e) => e.preventDefault()}
              onCheckedChange={() => handleCheckItem(item)}
            >
              <div className="tt-dropdownSelect-checkbox-wrapper">
                <DropdownMenu.ItemIndicator className="tt-dropdownSelect-checkbox-checked">
                  <CheckIcon className="tt-dropdownSelect-checkbox-icon" />
                </DropdownMenu.ItemIndicator>
              </div>
              {item.label}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
