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

export interface SelectOptionProps {
  className?: string;
  variant?: "default" | "bold-text";
  value: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  ({ className, children, variant, ...props }, forwardedRef) => {
    return (
      <Item
        className={cx("tt-select-content-option", variant, className)}
        ref={forwardedRef}
        {...props}
      >
        <ItemText>{children}</ItemText>
        <ItemIndicator className={cx("tt-select-content-option-indicator", variant)}>
          {/* <CheckIcon /> */}
        </ItemIndicator>
      </Item>
    );
  }
);

export interface SelectProps {
  value?: string;
  placeholder?: string;
  label?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange?(value: string);
  widthAuto?: boolean;
  variant?: "default" | "bold-text";
  customIcon?: React.ReactNode;
  className?: string;
}

export const Select = ({
  value,
  placeholder,
  label,
  options,
  onChange,
  widthAuto,
  variant = "default",
  customIcon,
  className,
}: SelectProps) => {
  const [width, setWidth] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (triggerRef?.current) {
      setWidth(triggerRef.current?.clientWidth);
    }
  }, [triggerRef?.current]);

  return (
    <Root value={value} onValueChange={onChange}>
      <Trigger
        className={cx("tt-select-trigger", variant, className)}
        aria-label={label}
        id="tt-select"
        ref={triggerRef}
      >
        <Value placeholder={placeholder} />
        <Icon className={cx("tt-select-trigger-icon")}>
          {customIcon || <TriangleDownIcon height={24} width={24} />}
        </Icon>
      </Trigger>
      <SelectPortal>
        <Content
          className={cx("tt-select-content", variant)}
          position="popper"
          style={{ width: widthAuto ? undefined : `${width}px`, zIndex: 10000 }}
        >
          <ScrollUpButton className={cx("tt-select-content-scrollbutton")}>
            <ChevronUpIcon />
          </ScrollUpButton>
          <Viewport className={cx("tt-select-content-viewport", variant)}>
            <Group className={cx("tt-select-content-group", variant)}>
              <Label className={cx("tt-select-content-label")}>{label}</Label>
              {(options || []).map((option, index) => (
                <SelectOption
                  key={`${index}${option?.value}`}
                  value={option?.value}
                  variant={variant}
                >
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
