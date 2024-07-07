import React, { useMemo } from "react";

import { formatDuration } from "../utils";
import { useVideoPlayerContext } from "../context";
import type { ControlProps } from ".";

export interface TimeControlProps extends ControlProps {}
export const TimeControl = ({}: TimeControlProps) => {
    const { durationSeconds, currentTimeSeconds } = useVideoPlayerContext();

    const durationFormated = useMemo(() => {
        return formatDuration(durationSeconds);
    }, [durationSeconds]);

    const currentTimeFormated = useMemo(() => {
        return formatDuration(currentTimeSeconds, Math.floor(durationSeconds / 3600) >= 60);
    }, [currentTimeSeconds, durationSeconds]);

    return (
        <div className="tt-video-player-control tt-video-player-control-text">
            {currentTimeFormated} / {durationFormated}
        </div>
    );
};
