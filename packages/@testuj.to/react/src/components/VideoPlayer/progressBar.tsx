import React, {
    type MouseEvent,
    useCallback,
    useRef,
    useState,
    useEffect,
} from "react";

import { formatDuration, parsePreviewImage } from "./utils";
import { useVideoPlayerContext } from "./context";

export interface ProgressBarProps {
    videoEl: HTMLVideoElement;
}

export const ProgressBar = ({ videoEl }: ProgressBarProps) => {
    const { videoFile, durationSeconds, currentTimeSeconds } = useVideoPlayerContext();

    const progressBarRef = useRef<HTMLDivElement>();

    const [hoverTimeSeconds, setHoverTimeSeconds] = useState<number>(null);
    const [hoverTimePercent, setHoverTimePercent] = useState<number>(null);
    const [previewImageSrc, setPreviewImageSrc] = useState<string>();

    const handleProgressBarClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (!videoEl || !progressBarRef?.current) {
            return;
        }

        const progressBarBoundingRect = progressBarRef.current.getBoundingClientRect();

        videoEl.currentTime = durationSeconds * ((event.pageX - progressBarBoundingRect.x) / progressBarBoundingRect.width);
    }, [videoEl, durationSeconds]);

    const handleProgressBarMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef?.current) {
            return;
        }

        const progressBarBoundingRect = progressBarRef.current.getBoundingClientRect();

        const coefficient = (event.pageX - progressBarBoundingRect.x) / progressBarBoundingRect.width;

        setHoverTimeSeconds(durationSeconds * coefficient);
        setHoverTimePercent((coefficient * 10000) / 100);

        const previewImageSrc = parsePreviewImage(
            videoFile,
            Math.floor(videoFile?.videoDetails?.durationMs * coefficient),
            256,
        );

        setPreviewImageSrc(previewImageSrc);
    }, [durationSeconds, videoFile?.videoDetails?.durationMs]);

    const handleProgressBarMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
        setHoverTimeSeconds(null);
        setHoverTimePercent(null);
        setPreviewImageSrc(null);
    }, []);

    return (
        <div
            ref={progressBarRef}
            className="tt-video-player-progress-bar"
            onClick={handleProgressBarClick}
            onMouseMove={handleProgressBarMouseMove}
            onMouseLeave={handleProgressBarMouseLeave}
        >
            <div
                className="tt-video-player-progress-bar-current"
                style={{
                    width: `${Math.round((currentTimeSeconds / durationSeconds) * 10000) / 100}%`,
                }}
            />
            {!!hoverTimeSeconds && (
                previewImageSrc ? (
                    <div
                        className="tt-video-player-progress-bar-preview-container"
                        style={{ left: `${hoverTimePercent}%` }}
                    >
                        <img
                            src={previewImageSrc}
                            className="tt-video-player-progress-bar-preview"
                        />
                        <div className="tt-video-player-progress-bar-preview-label">
                            {formatDuration(hoverTimeSeconds, Math.floor(durationSeconds / 3600) >= 60)}
                        </div>
                    </div>
                ) : (
                    <div
                        className="tt-video-player-progress-bar-previewlabel"
                        style={{ left: `${hoverTimePercent}%` }}
                    >
                        {formatDuration(hoverTimeSeconds, Math.floor(durationSeconds / 3600) >= 60)}
                    </div>
                )
            )}
        </div>
    );
};
