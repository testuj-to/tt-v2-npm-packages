import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import cx from "classnames";

import "./styles.css";
import { useState } from "react";

export interface SelectedItem {
  label: string;
  value: string;
}

export interface DropdownSelectProps {
  triggerLabel: string;
  items: SelectedItem[];
  onItemSelect?: (item: SelectedItem) => void;
  onItemDeselect?: (item: SelectedItem) => void;
  onSelectionChange?: (items: SelectedItem[]) => void;
}

export const DropdownSelect = ({
  triggerLabel,
  items,
  onItemSelect,
  onItemDeselect,
  onSelectionChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const isChecked = (item: SelectedItem) =>
    selectedItems.some((selectedItem) => selectedItem.value === item.value);

  const handleCheckItem = (item: SelectedItem) => {
    const itemIndex = selectedItems.findIndex((selectedItem) => selectedItem.value === item.value);
    const newSelectedItems = [...selectedItems];

    if (itemIndex === -1) {
      newSelectedItems.push(item);
      onItemSelect?.(item);
    } else {
      newSelectedItems.splice(itemIndex, 1);
      onItemDeselect?.(item);
    }

    setSelectedItems(newSelectedItems);
    onSelectionChange?.(newSelectedItems);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="tt-dropdownSelect-trigger" aria-label="Customise options">
          Hello
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="tt-dropdownSelect-content" sideOffset={5}>
          {items?.map((item, index) => (
            <DropdownMenu.CheckboxItem
              key={item.value}
              className="tt-dropdownSelect-item"
              checked={isChecked(item)}
              onCheckedChange={() => handleCheckItem(item)}
            >
              <DropdownMenu.ItemIndicator className="tt-dropdownSelect-checkbox">
                X
              </DropdownMenu.ItemIndicator>
              {item.label}
            </DropdownMenu.CheckboxItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
