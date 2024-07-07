
import type { VideoFile } from ".";

export const formatDuration = (durationSeconds: number, forceIncludeHours: boolean = false): string => {
    if (typeof durationSeconds !== "number") {
        return "00:00";
    }

    let minutes = Math.floor(Math.floor(durationSeconds) / 60);
    const seconds = Math.floor(durationSeconds) - (minutes * 60);

    const hours = minutes >= 60 ? Math.floor(minutes / 60) : null;
    if (hours) {
        minutes = minutes - (hours * 60);
    }

    const durationFormated = `${minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })}:${seconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })}`;

    return (forceIncludeHours || hours) ? `${hours.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
    })}:${durationFormated}` : durationFormated;
};

export const parsePreviewImage = (
    video: VideoFile,
    timeMs: number,
    height: number = 256,
) => {
    if (video?.isBeingProcessed || !/\.m3u8$/.test(video?.src)) {
        return null;
    }

    const durationMs = video?.videoDetails?.durationMs || 0;
    const lastFrameTimeMs = durationMs - (durationMs % 1500);

    let frameIndex = "0000000";
    if (timeMs >= lastFrameTimeMs) {
        frameIndex = Math
            .floor(lastFrameTimeMs / 1500)
            .toString()
            .padStart(7, "0");
    } else if (timeMs >= 750) {
        frameIndex = Math
            .floor((timeMs + 750) / 1500)
            .toString()
            .padStart(7, "0");
    }

    return String(video.src).replace(/vid/, "img/vid").replace(/\.m3u8$/, `.${frameIndex}.jpg?h=${height}`);
};
