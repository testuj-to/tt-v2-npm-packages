import cx from "classnames";

import "./styles.css";

import { IconPending } from "./IconPending";
import { IconCheck } from "./IconCheck";
import { IconCancel } from "./IconCancel";

export enum ProgressState {
    active = "active",
    done = "done",
    disabled = "disabled",
    error = "error",
}

export type StateProgressListItem = {
    state?: ProgressState;
    content?: React.ReactNode;
    note?: React.ReactNode;
    active?: boolean;
};

export interface StateProgressListProps {
    className?: string;
    items: StateProgressListItem[];
    currentIndex?: number;
    pastSuccess?: boolean;
    onClick?: (index: number) => void;
}

export const StateProgressList = ({
    className,
    items,
    pastSuccess,
    currentIndex,
    onClick,
}: StateProgressListProps) => {
    return (
        <ol className={cx("tt-state-progress-list", className)}>
            {items?.map(({ content, note, active }, index) => {
                let currentState = ProgressState.disabled;
                if (pastSuccess && index === currentIndex) {
                    currentState = ProgressState.active;
                } else if (pastSuccess && index < currentIndex) {
                    currentState = ProgressState.done;
                }

                return (
                    <StateProgressListItem
                        key={index}
                        state={currentState}
                        note={note}
                        onClick={() =>
                            onClick?.(index)}
                    >
                        {content}
                    </StateProgressListItem>
                );
            })}
        </ol>
    );
};

interface StateProgressListItemProps {
    state: ProgressState;
    note?: React.ReactNode;
    children?: React.ReactNode;
    onClick?: () => void;
}

const StateProgressListItem = ({ state, children, onClick, note }: StateProgressListItemProps) => {
    return (
        <>
            <li
                className="tt-state-progress-list-item"
                onClick={onClick}
            >
                <StateProgressIndicator {...{ state }} />
                    <div className={cx("tt-state-progress-list-item_content", state)}>
                        {children}
                    </div>
            </li>
            {note}
        </>
    );
};

interface StateProgressIndicatorProps {
    state: ProgressState;
}

const StateProgressIndicator = ({ state }: StateProgressIndicatorProps) => {
    const Icon = {
        active: <IconPending/>,
        done: <IconCheck/>,
        disabled: <IconCancel/>,
        error: <IconCancel/>,
    }[state];

    return (
        <div className={cx("tt-state-progress-indicator", state)}>
            {Icon}
        </div>
    );
};
