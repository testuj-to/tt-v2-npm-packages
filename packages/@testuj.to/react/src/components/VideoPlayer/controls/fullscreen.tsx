import React, { MouseEventHandler, useMemo } from "react";

import { IconMinimize } from "../icons/IconMinimize";
import { IconMaximize } from "../icons/IconMaximize";
import { useVideoPlayerContext } from "../context";
import type { ControlProps } from ".";

export interface FullscreenControlProps extends ControlProps {
    onToggleFullscreen: MouseEventHandler<SVGSVGElement>;
}

export const FullscreenControl = ({ onToggleFullscreen }: FullscreenControlProps) => {
    const { isFullscreen, iconProps } = useVideoPlayerContext();

    if (isFullscreen) {
        return (
            <IconMinimize
                {...iconProps}
                className="tt-video-player-control"
                onClick={onToggleFullscreen}
            />
        );
    }

    return (
        <IconMaximize
            {...iconProps}
            className="tt-video-player-control"
            onClick={onToggleFullscreen}
        />
    );
};
