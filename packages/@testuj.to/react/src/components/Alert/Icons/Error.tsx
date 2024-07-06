interface AlertIconProps extends React.HTMLAttributes<SVGElement> {}

export const ErrorIcon = ({ ...props }: AlertIconProps) => {
    return (
        <svg
            {...props}
            className="MuiSvgIcon-root MuiSvgIcon-fontSizeInherit css-1cw4hi4"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ErrorOutlineIcon"
        >
            <path
                d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
                fill="currentColor"
            />
        </svg>
    );
};
