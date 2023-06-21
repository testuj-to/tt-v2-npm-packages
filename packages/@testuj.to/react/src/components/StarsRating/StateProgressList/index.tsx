import cx from "classnames";

import "./styles.css";
import { IconPending } from "./IconPending";
import { IconCheck } from "./IconCheck";
import { IconCancel } from "./IconCancel";

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
        let currentState = state;
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
  const Icon = {
    active: <IconPending />,
    done: <IconCheck />,
    disabled: <IconCancel />,
    error: <IconCancel />,
  }[state];

  return <div className={cx("tt-state-progress-indicator", state)}>{Icon}</div>;
};
