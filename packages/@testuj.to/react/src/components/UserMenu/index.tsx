import * as Popover from "@radix-ui/react-popover";
import cx from "classnames";
import "./styles.css";
import { UserAvatar } from "../UserAvatar";
import { ProgressBar } from "../ProgressBar";

export interface User {
  name: string;
  title: string;
  image: string;
  badge?: string;
}

export interface MenuItem {
  label: string;
  onClick: () => void;
}

export interface UserMenuProps {
  user: User;
  menuItems?: MenuItem[];
  xpBar?: {
    value?: number;
    hidden?: boolean;
    breakpoints?: number[];
  };
  className?: string;
  onUserClick?: () => void;
}

export const UserMenu = ({ user, xpBar, menuItems, className, onUserClick }: UserMenuProps) => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button className={cx("tt-user-menu_trigger", className)}>
        <UserAvatar {...user} hideUserText />
      </button>
    </Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="tt-user-menu_content" sideOffset={5}>
        <div className="tt-user-menu_header">
          <UserAvatar {...user} onClick={onUserClick} />
          {xpBar?.hidden ? null : (
            <ProgressBar
              className="tt-user-menu_progress-bar"
              value={xpBar?.value}
              breakpoints={xpBar.breakpoints}
              delay={200}
              breakpointColor="var(--color-text-secondary)"
              lineColor="#00C5FE"
            />
          )}
        </div>
        <div className="tt-user-menu_body">
          {menuItems?.map(({ label, onClick }, index) => (
            <div key={label + index} onClick={() => onClick()} className="tt-user-menu_item">
              {label}
            </div>
          ))}
        </div>
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);
