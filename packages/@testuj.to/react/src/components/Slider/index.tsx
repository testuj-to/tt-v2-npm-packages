import * as RadixSlider from "@radix-ui/react-slider";
import "./styles.css";

export interface SliderProps {}

export const Slider = ({}: SliderProps) => (
  <RadixSlider.Root className="tt-slider-root" defaultValue={[50]} max={100} step={1}>
    <RadixSlider.Track className="tt-slider-track">
      <RadixSlider.Range className="tt-slider-range" />
    </RadixSlider.Track>
    <RadixSlider.Thumb className="tt-slider-thumb" />
  </RadixSlider.Root>
);
