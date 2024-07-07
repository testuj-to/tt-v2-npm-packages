import React, { useState } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Slider from "@radix-ui/react-slider";

import { IconVolume } from "../icons/IconVolume";
import { IconVolume2 } from "../icons/IconVolume2";
import { IconVolumeOff } from "../icons/IconVolumeOff";
import { useVideoPlayerContext } from "../context";
import type { ControlProps } from ".";

export interface VolumeControlProps extends ControlProps {
    container: HTMLDivElement;
    onChange?(value: number);
    onToggle?();
}

export const VolumeControl = ({ container, onChange, onToggle }: VolumeControlProps) => {
    const { volume, iconProps } = useVideoPlayerContext();

    const [isOpened, setIsOpened] = useState(false);

    return (
        <HoverCard.Root
            open={isOpened}
            onOpenChange={setIsOpened}
        >
            <HoverCard.Trigger asChild>
                <div
                    className="tt-video-player-control tt-video-player-control-volume"
                    onClick={onToggle}
                >
                    {volume <= 0 ? (
                        <IconVolumeOff {...iconProps} />
                    ) : (
                        volume <= 0.5 ?
                            <IconVolume2 {...iconProps} /> :
                            <IconVolume {...iconProps} />
                    )}
                </div>
            </HoverCard.Trigger>
            <HoverCard.Portal container={container}>
                <HoverCard.Content
                    className="tt-video-player-volume"
                    side="top"
                    sideOffset={5}
                >
                    <Slider.Root
                        className="tt-video-player-volume-slider"
                        orientation="vertical"
                        value={[volume * 100]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={value => {
                            const volume = value?.[0];

                            if (!isNaN(volume)) {
                                if (volume < 3) {
                                    onChange?.(0);
                                    return;
                                }

                                if (volume > 97) {
                                    onChange?.(1);
                                    return;
                                }

                                onChange?.(volume / 100);
                            }
                        }}
                    >
                        <Slider.Track className="tt-video-player-volume-slider-track">
                            <Slider.Range className="tt-video-player-volume-slider-range" />
                        </Slider.Track>
                        <Slider.Thumb
                            className="tt-video-player-volume-slider-thumb"
                            aria-label="Volume"
                        />
                    </Slider.Root>
                    <HoverCard.Arrow className="tt-video-player-volume-arrow" />
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
};
