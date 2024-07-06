export interface ArrowProps extends React.SVGAttributes<SVGElement> {
    direction: "left" | "right";
}

export const Arrow = ({ direction, ...props }: ArrowProps) => {
    if (direction === "left") {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
            >
                <path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z" fill="currentColor" />
            </svg>
        );
    }

    if (direction === "right") {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
            >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" fill="currentColor" />
            </svg>
        );
    }

    return null;
};
