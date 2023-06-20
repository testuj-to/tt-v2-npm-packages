import * as RadixSlider from "@radix-ui/react-slider";
import cx from "classnames";
import "./styles.css";

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  className?: string;
  defaultValue?: number;
  value?: number;
  variant?: "primary" | "secondary";
}

export const Slider = ({
  min,
  max,
  step,
  onChange,
  className,
  defaultValue,
  value,
  variant = "primary",
}: SliderProps) => (
  <RadixSlider.Root
    className={cx("tt-slider-root", className)}
    defaultValue={[defaultValue]}
    onValueChange={(value) => onChange?.(value[0])}
    {...{ min, max, step }}
    value={value ? [value] : undefined}
  >
    <RadixSlider.Track className={cx("tt-slider-track", variant)}>
      <RadixSlider.Range className={cx("tt-slider-range", variant)} />
    </RadixSlider.Track>
    <RadixSlider.Thumb className={cx("tt-slider-thumb", variant)} />
  </RadixSlider.Root>
);
