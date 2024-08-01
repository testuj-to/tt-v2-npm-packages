import cx from "classnames";

import "./styles.css";

import { Item, ProgressState } from "./item";

export { ProgressState } from "./item";

export interface StateProgressListItem {
    state?: ProgressState;
    active?: boolean;
    content?: React.ReactNode;
    note?: React.ReactNode;
}

export interface StateProgressListProps {
    className?: string;
    items: StateProgressListItem[];
    currentIndex?: number;
    pastSuccess?: boolean;
    onClick?(index: number): void;
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
                    <Item
                        key={index}
                        state={currentState}
                        note={note}
                        onClick={() =>
                            onClick?.(index)}
                    >
                        {content}
                    </Item>
                );
            })}
        </ol>
    );
};
