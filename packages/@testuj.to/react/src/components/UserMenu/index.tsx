import * as Popover from "@radix-ui/react-popover";
import cx from "classnames";

import "./styles.css";

import { UserAvatar } from "../UserAvatar";
import { ProgressBar } from "../ProgressBar";

export interface User {
    name: string;
    title: string;
    image: string;
    badge?: string | React.ReactNode;
}

export interface MenuItem {
    label: string;
    onClick(): void;
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
    onUserClick?(): void;
}

export const UserMenu = ({ user, xpBar, menuItems, className, onUserClick }: UserMenuProps) => {
    return (
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
                        {!xpBar?.hidden && (
                            <ProgressBar
                                className="tt-user-menu_progress-bar"
                                delay={200}
                                breakpointColor="var(--color-text-secondary)"
                                lineColor="#00C5FE"
                                value={xpBar?.value}
                                breakpoints={xpBar.breakpoints}
                            />
                        )}
                    </div>
                    <div className="tt-user-menu_body">
                        {menuItems?.map(({ label, onClick }, index) => (
                            <div
                                key={label + index}
                                className="tt-user-menu_item"
                                onClick={() =>
                                    onClick?.()}
                            >
                                {label}
                            </div>
                        ))}
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};
