import * as HoverCard from "@radix-ui/react-hover-card";
import * as Slider from "@radix-ui/react-slider";

import { IconVolume } from "./icons/IconVolume";
import { IconVolume2 } from "./icons/IconVolume2";
import { IconVolumeOff } from "./icons/IconVolumeOff";

export interface VolumeControlProps {
    value: number;
    iconProps?: object;
    onChange?(value: number);
    onToggle?();
}

export const VolumeControl = ({ value, iconProps, onChange, onToggle }: VolumeControlProps) => {
    return (
        <HoverCard.Root>
            <HoverCard.Trigger asChild>
                {value <= 0 ? (
                    <IconVolumeOff
                        {...iconProps}
                        className="tt-video-player-control"
                        onClick={onToggle}
                    />
                ) : (
                    value <= 0.5 ? (
                        <IconVolume2
                            {...iconProps}
                            className="tt-video-player-control"
                            onClick={onToggle}
                        />
                    ) : (
                        <IconVolume
                            {...iconProps}
                            className="tt-video-player-control"
                            onClick={onToggle}
                        />
                    )
                )}
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    className="tt-video-player-volume-container"
                    sideOffset={5}
                >
                    <Slider.Root
                        className="tt-video-player-volume-slider"
                        orientation="vertical"
                        defaultValue={[value * 100]}
                        max={100}
                        step={0}
                        onValueChange={value =>
                            onChange?.(value?.[0])}
                    >
                        <Slider.Track className="tt-video-player-volume-slider-track">
                            <Slider.Range className="tt-video-player-volume-slider-range" />
                        </Slider.Track>
                        <Slider.Thumb
                            className="tt-video-player-volume-slider-thumb"
                            aria-label="Volume"
                        />
                    </Slider.Root>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};
