import * as Popover from "@radix-ui/react-popover";
import cx from "classnames";
import "./styles.css";
import { IconBell } from "./IconBell";
import {type NotificationProps, Notification } from "./Notification";

export interface NotificationsPopoverProps {
  notifications: NotificationProps[];
  className?: string;
}

export const NotificationsPopover = ({ notifications, className, ...props } : NotificationsPopoverProps) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button className={cx("tt-notifications-menu_trigger", className)}>
          <IconBell />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="tt-notifications-menu_content" sideOffset={5}>
          {notifications.map((notification: NotificationProps, index: number) => (<Notification key={notification.dateTime + index} {...notification} />))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export type Notification = NotificationProps;