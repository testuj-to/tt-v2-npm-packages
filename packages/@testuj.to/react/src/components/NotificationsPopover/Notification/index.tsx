import { IconThumb } from "./IconThumb";

export interface NotificationProps {
  title: string;
  description: string;
  date: string;
  type: "info" | "error" | "success";
}

export const Notification = ({ title, description, date, type }: NotificationProps) => {
  return (
    <div className="tt-notification">
      <div className="tt-notification-section-icon">
        <IconThumb />
      </div>
      <div className="tt-notification-section-text">
        <div className="tt-notification-title">{title}</div>
        <div className="tt-notification-description">{description}</div>
        <div className="tt-notification-date">{date}</div>
      </div>
    </div>
  );
};
