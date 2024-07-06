import "./styles.css";

export interface HighlightedTextProps {
    children: string;
}

export const HighlightedText = ({ children }: HighlightedTextProps) => {
    return (
        <span className="highlighted">
            {children}
        </span>
    );
};
