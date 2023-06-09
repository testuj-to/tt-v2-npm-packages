import * as Popover from "@radix-ui/react-popover";
import cx from "classnames";
import "./styles.css";
import { IconBell } from "./IconBell";
import {type NotificationProps, Notification } from "./Notification";

export interface NotificationsPopoverProps {
  notifications: NotificationProps[];
}

export const NotificationsPopover = ({ notifications, className, ...props }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={cx("tt-user-menu_trigger", className)}>
          <IconBell />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="tt-user-menu_content" sideOffset={5}>
          {/* {menuItems?.map(({ label, onClick }, index) => (
            <div key={label + index} {...onClick} className="tt-user-menu_item">
              {label}
            </div>
          ))} */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
