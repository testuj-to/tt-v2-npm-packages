import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useCallback, useState } from "react";
import { CheckIcon, TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";

import "./styles.css";

export interface SelectItem {
    label: string;
    value: string;
}

export interface DropdownSelectProps {
    triggerLabel: string;
    items: SelectItem[];
    selectedItemsProps?: SelectItem[];
    className?: string;
    onSelectionChange?: (items: SelectItem[]) => void;
}

export const DropdownSelect = ({
    triggerLabel,
    items,
    selectedItemsProps,
    className,
    onSelectionChange,
}: DropdownSelectProps) => {
    const [selectedItemsLocal, setSelectedItemsLocal] = useState<SelectItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const selectedItems = selectedItemsProps || selectedItemsLocal;

    const isChecked = (item: SelectItem) =>
        selectedItems.some((selectedItem) => selectedItem.value === item.value);

    const handleCheckItem = useCallback((item: SelectItem) => {
        const itemIndex = selectedItems.findIndex(selectedItem =>
            selectedItem.value === item.value);
        const newSelectedItems = [...selectedItems];

        if (itemIndex === -1) {
            newSelectedItems.push(item);
        } else {
            newSelectedItems.splice(itemIndex, 1);
        }

        setSelectedItemsLocal(newSelectedItems);
        onSelectionChange?.(newSelectedItems);
    }, [JSON.stringify(selectedItems)]);

    return (
        <DropdownMenu.Root
            onOpenChange={event =>
                setIsOpen(event)}
        >
            <DropdownMenu.Trigger className={className} asChild>
                <button className="tt-dropdownSelect-trigger" aria-label="Customise options">
                    {triggerLabel}
                    {!!selectedItems.length && (
                        <div className="tt-dropdownSelect-counter">
                            {selectedItems.length}
                        </div>
                    )}
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
                            onSelect={event =>
                                event?.preventDefault?.()}
                            onCheckedChange={() =>
                                handleCheckItem(item)}
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
