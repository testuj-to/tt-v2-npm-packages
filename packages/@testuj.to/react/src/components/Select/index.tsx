import { forwardRef, useEffect, useRef, useState } from "react";
import cx from "classnames";
import {
  Root,
  Trigger,
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
  SelectPortal,
} from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon, TriangleDownIcon } from "@radix-ui/react-icons";

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
  const [width, setWidth] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef?.current) {
      setWidth(triggerRef.current?.clientWidth);
    }
  }, [triggerRef?.current]);

  console.log(width);

  return (
    <Root value={value} onValueChange={onChange}>
      <Trigger
        className={cx("tt-select-trigger")}
        aria-label={label}
        id="tt-select"
        ref={triggerRef}
      >
        <Value placeholder={placeholder} />
        <Icon className={cx("tt-select-trigger-icon")}>
          <TriangleDownIcon height={24} width={24} />
        </Icon>
      </Trigger>
      <SelectPortal>
        <Content
          className={cx("tt-select-content")}
          position="popper"
          style={{ width: `${width}px` }}
        >
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
      </SelectPortal>
    </Root>
  );
};
