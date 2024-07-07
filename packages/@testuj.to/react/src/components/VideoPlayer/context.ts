import { createContext, useContext } from "react";

import type { VideoFile } from ".";

export interface IconProps {
    size: string;
}

export interface VideoPlayerContext {
    videoFile: VideoFile;
    isWaiting: boolean;
    isPlaying: boolean;
    isFullscreen: boolean;
    durationSeconds: number;
    currentTimeSeconds: number;
    volume: number;
    iconProps: IconProps;
}

export const videoPlayerContext = createContext<VideoPlayerContext>({
    videoFile: null,
    isWaiting: true,
    isPlaying: false,
    isFullscreen: false,
    volume: 1,
    durationSeconds: 0,
    currentTimeSeconds: 0,
    iconProps: {
        size: "20px",
    },
});

export const useVideoPlayerContext = () =>
    useContext(videoPlayerContext);
