import "./styles.css";

export interface LabeledIconProps {
  icon: React.ReactNode;
  label: string;
}

export const LabeledIcon = ({ icon, label }: LabeledIconProps) => {
  return (
    <div className="tt-labeled-icon-wrapper">
      <div className="tt-labeled-icon-icon">{icon}</div>
      <div className="tt-labeled-icon-label">{label}</div>
    </div>
  );
};
