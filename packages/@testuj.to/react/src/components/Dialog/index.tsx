import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import cx from "classnames";

import "./styles.css";

export interface DialogProps {
  children: React.ReactNode;
  content: React.ReactNode;
  hideCloseButton?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const Dialog = ({
  children,
  content,
  hideCloseButton,
  open,
  onOpenChange,
  className,
}: DialogProps) => {
  return (
    <RadixDialog.Root {...{ open, onOpenChange }}>
      <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="tt-dialog-overlay" />
        <RadixDialog.Content className={cx("tt-dialog-content", className)}>
          {content}
          {hideCloseButton ? null : (
            <RadixDialog.Close asChild>
              <button className="tt-dialog-icon-button" aria-label="Close">
                <Cross2Icon />
              </button>
            </RadixDialog.Close>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
