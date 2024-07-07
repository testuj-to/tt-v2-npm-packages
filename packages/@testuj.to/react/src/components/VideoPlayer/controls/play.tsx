import React, { type MouseEventHandler } from "react";

import { IconLoaderQuarter } from "../icons/IconLoaderQuarter";
import { IconPlayerPauseFilled } from "../icons/IconPlayerPauseFilled";
import { IconPlayerPlayFilled } from "../icons/IconPlayerPlayFilled";
import { useVideoPlayerContext } from "../context";
import type { ControlProps } from ".";

export interface PlayControlProps extends ControlProps {
    onPause?: MouseEventHandler<SVGSVGElement>;
    onPlay?: MouseEventHandler<SVGSVGElement>;
}

export const PlayControl = ({ onPlay, onPause }: PlayControlProps) => {
    const { isWaiting, isPlaying, iconProps } = useVideoPlayerContext();

    if (isWaiting) {
        return (
            <IconLoaderQuarter
                {...iconProps}
                className="tt-video-player-control tt-video-player-control-rotating"
            />
        );
    }

    if (isPlaying) {
        return (
            <IconPlayerPauseFilled
                {...iconProps}
                className="tt-video-player-control"
                onClick={onPause}
            />
        );
    }

    return (
        <IconPlayerPlayFilled
            {...iconProps}
            className="tt-video-player-control"
            onClick={onPlay}
        />
    );
};
