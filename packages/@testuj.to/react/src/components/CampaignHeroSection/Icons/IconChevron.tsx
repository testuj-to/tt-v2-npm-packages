import { IconProps } from ".";

interface ChevronProps extends IconProps {
    direction?: "up" | "down" | "left" | "right";
}

export const IconChevron = (props: ChevronProps) => {
    const { direction = "down", ...rest } = props;

    let rotate = "90";
    switch (direction) {
    case "up":
        rotate = "270";
        break;
    case "down":
        rotate = "90";
        break;
    case "left":
        rotate = "180";
        break;
    case "right":
        rotate = "0";
        break;
    }

    let translateX = 24;
    let translateY = 24;
    switch (direction) {
    case "up":
        translateX = 0;
        translateY = 24;
        break;
    case "down":
        translateX = 24;
        translateY = 0;
        break;
    case "left":
        translateX = 24;
        translateY = 24;
        break;
    case "right":
        translateX = 0;
        translateY = 0;
        break;
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...rest}>
            <g
                id="icoChevron"
                transform={`translate(${translateX} ${translateY}) rotate(${rotate})`}
            >
                <rect id="Rectangle_84" data-name="Rectangle 84" width="24" height="24" fill="none" />
                <path
                    id="Path_24"
                    data-name="Path 24"
                    d="M2305.391,116.257h6v-6"
                    transform="translate(-1701.621 1564.194) rotate(-45)"
                    fill="none"
                    stroke="#0d1a33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    );
};
