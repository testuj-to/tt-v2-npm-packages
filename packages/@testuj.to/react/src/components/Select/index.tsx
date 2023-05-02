import { forwardRef, useRef } from "react";
import cx from "classnames";
import {
  Root,
  Trigger,
  Portal,
  Content,
  Viewport,
  Group,
  Item,
  ItemText,
  ItemIndicator,
  Label,
  Value,
  Icon,
  ScrollUpButton,
  ScrollDownButton,
} from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

import "./styles.css";

const SelectOption = forwardRef<any, any>(({ className, children, ...props }, forwardedRef) => {
  return (
    <Item className={cx("tt-select-content-option", className)} ref={forwardedRef} {...props}>
      <ItemText>{children}</ItemText>
      <ItemIndicator className={cx("tt-select-content-option-indicator")}>
        {/* <CheckIcon /> */}
      </ItemIndicator>
    </Item>
  );
});

export interface SelectProps {
  value?: string;
  placeholder?: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange?(value: string);
  multiple?: boolean;
}

export const Select = ({ value, placeholder, label, options, onChange, multiple }: SelectProps) => {
  return (
    <Root value={value} onValueChange={onChange}>
      <Trigger className={cx("tt-select-trigger")} aria-label={label} id="tt-select">
        <Value placeholder={placeholder} />
        <Icon className={cx("tt-select-trigger-icon")}>
          <ChevronDownIcon />
        </Icon>
      </Trigger>
      <Portal>
        <Content className={cx("tt-select-content")} position="popper">
          <ScrollUpButton className={cx("tt-select-content-scrollbutton")}>
            <ChevronUpIcon />
          </ScrollUpButton>
          <Viewport className={cx("tt-select-content-viewport")}>
            <Group className={cx("tt-select-content-group")}>
              <Label className={cx("tt-select-content-label")}>{label}</Label>
              {(options || []).map((option, index) => (
                <SelectOption key={`${index}${option?.value}`} value={option?.value}>
                  {option?.label}
                </SelectOption>
              ))}
            </Group>
          </Viewport>
          <ScrollDownButton className={cx("tt-select-content-scrollbutton")}>
            <ChevronDownIcon />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>
  );
};
