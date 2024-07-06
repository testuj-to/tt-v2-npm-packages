import cx from "classnames";
import moment from "moment";

import { IconExclamation } from "./IconExclamation";
import { IconInfo } from "./IconInfo";
import { IconThumb } from "./IconThumb";

import "./styles.css";

export interface NotificationProps {
    title: string;
    description: string;
    dateTime: string;
    type: "info" | "error" | "success";
}

export const Notification = ({ title, description, dateTime, type }: NotificationProps) => {
    return (
        <div className="tt-notification">
            <div className={cx("tt-notification-section-icon", type)}>
                {type === "info" && <IconInfo/>}
                {type === "error" && <IconExclamation/>}
                {type === "success" && <IconThumb/>}
            </div>
            <div className="tt-notification-section-text">
                <div className="tt-notification-title">
                    {title}
                </div>
                <div className="tt-notification-description">
                    {description}
                </div>
                <div className="tt-notification-time">
                    {moment(dateTime).fromNow()}
                </div>
            </div>
        </div>
  );
};
