export interface IconCheckProps extends React.SVGProps<SVGSVGElement> {}

export const IconCheck = ({ ...props }: IconCheckProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20">
      <path d="M396-259 202-454l79.5-79.5L396-420l282.5-281.5L758-621 396-259Z" fill="#fff" />
    </svg>
  );
};
