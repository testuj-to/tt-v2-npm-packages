import cx from "classnames";

import { IconPending } from "./IconPending";
import { IconCheck } from "./IconCheck";
import { IconCancel } from "./IconCancel";

const icons = {
    active: <IconPending/>,
    done: <IconCheck/>,
    disabled: <IconCancel/>,
    error: <IconCancel/>,
};

export enum ProgressState {
    active = "active",
    done = "done",
    disabled = "disabled",
    error = "error",
}

export interface ItemProps {
    state: ProgressState;
    note?: React.ReactNode;
    children?: React.ReactNode;
    onClick?(): void;
}

export const Item = ({ state, note, children, onClick }: ItemProps) => {
    return (
        <>
            <li
                className="tt-state-progress-list-item"
                onClick={onClick}
            >
                <div className={cx("tt-state-progress-indicator", state)}>
                    {icons[state]}
                </div>
                <div className={cx("tt-state-progress-list-item_content", state)}>
                    {children}
                </div>
            </li>
            {note}
        </>
    );
};
