import { IconProps } from ".";

interface ChevronProps extends IconProps {
  direction?: "up" | "down" | "left" | "right";
}

export const IconChevron = (props: ChevronProps) => {
  const { direction = "down", ...rest } = props;

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "270";
      case "down":
        return "90";
      case "left":
        return "180";
      case "right":
        return "0";
      default:
        return "90";
    }
  };

  const getTransformOrigin = () => {
    switch (direction) {
      case "up":
        return [0, 24];
      case "down":
        return [24, 0];
      case "left":
        return [24, 24];
      case "right":
        return [0, 0];
      default:
        return [24, 24];
    }
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...rest}>
      <g
        id="icoChevron"
        transform={`translate(${getTransformOrigin()[0]} ${
          getTransformOrigin()[1]
        }) rotate(${getTransform()})`}
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
