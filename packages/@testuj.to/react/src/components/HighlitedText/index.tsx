import "./styles.css";

export interface HighlitedTextProps {
  children: string;
}

export const HighlitedText = ({ children }: HighlitedTextProps) => {
  return <span className="highlited">{children}</span>;
};
