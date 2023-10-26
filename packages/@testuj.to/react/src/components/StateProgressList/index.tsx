import cx from "classnames";

import { IconPending } from "./IconPending";
import { IconCheck } from "./IconCheck";
import { IconCancel } from "./IconCancel";

import "./styles.css";

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
      {items?.map(({ state, content, note, active }, index) => {
        let currentState = state;
        if (pastSuccess && index === currentIndex) {
          currentState = ProgressState.active;
        } else if (pastSuccess && index < currentIndex) {
          currentState = ProgressState.done;
        } else {
          currentState = ProgressState.disabled;
        }
        return (
          <StateProgressListItem
            key={index}
            state={state || currentState}
            onClick={() => onClick?.(index)}
            note={note}
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
  children?: React.ReactNode;
  onClick?: () => void;
  note?: React.ReactNode;
}

const StateProgressListItem = ({ state, children, onClick, note }: StateProgressListItemProps) => {
  return (
    <>
      <li className="tt-state-progress-list-item" onClick={onClick}>
        <StateProgressIndicator {...{ state }} />
        <div className={cx("tt-state-progress-list-item_content", state)}>{children}</div>
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
    active: <IconPending />,
    done: <IconCheck />,
    disabled: <IconCancel />,
    error: <IconCancel />,
  }[state];

  return <div className={cx("tt-state-progress-indicator", state)}>{Icon}</div>;
};
