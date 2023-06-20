import cx from "classnames";

import "./styles.css";

export type StateProgressListState = "active" | "done" | "disabled" | "error";

export type StateProgressListItem = {
  state?: StateProgressListState;
  content?: React.ReactNode;
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
      {items?.map(({ state, content }, index) => {
        let currentState = structuredClone(state);
        if (pastSuccess && index === currentIndex) {
          currentState = "active";
        } else if (pastSuccess && index < currentIndex) {
          currentState = "done";
        } else {
          currentState = "disabled";
        }
        return (
          <StateProgressListItem key={index} state={currentState} onClick={() => onClick?.(index)}>
            {index + 1}) {content}
          </StateProgressListItem>
        );
      })}
    </ol>
  );
};

interface StateProgressListItemProps {
  state: StateProgressListState;
  children?: React.ReactNode;
  onClick?: () => void;
}

const StateProgressListItem = ({ state, children, onClick }: StateProgressListItemProps) => {
  return (
    <li className="tt-state-progress-list-item" onClick={onClick}>
      <StateProgressIndicator {...{ state }} />
      <div className={cx("tt-state-progress-list-item_content", state)}>{children}</div>
    </li>
  );
};

interface StateProgressIndicatorProps {
  state: StateProgressListState;
}

const StateProgressIndicator = ({ state }: StateProgressIndicatorProps) => {
  return (
    <div className="tt-state-progress-indicator">
      <div className="tt-state-progress-indicator__circle"></div>
    </div>
  );
};
