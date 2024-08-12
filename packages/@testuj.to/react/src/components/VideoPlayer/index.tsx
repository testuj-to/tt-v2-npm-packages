import React, {
    type MouseEvent,
    type VideoHTMLAttributes,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import cx from "classnames";
import Hls, { HlsConfig, Level, MediaPlaylist } from "hls.js";

import "./styles.css";

import { CDNFile, VideoFileDetails } from "@lib/types";
import { videoPlayerContext } from "./context";
import { withVideoPreview, defaultTranslations } from "./preview";
import { ProgressBar } from "./progressBar";
import {
    Controls,
    PlayControl,
    TimeControl,
    VolumeControl,
    FullscreenControl,
} from "./controls";

export interface VideoFile extends CDNFile {
    src: string;
    isBeingProcessed: boolean;
    videoDetails: Required<VideoFileDetails>;
}

export interface VideoPlayerTranslations {
    isBeingProcessed: string;
}

export interface VideoPlayerProps {
    video: VideoFile;
    videoProps?: VideoHTMLAttributes<HTMLVideoElement>;
    hlsConfig?: HlsConfig;
    width?: number | string;
    height?: number | string;
    controlSize?: string | number;
    progressBarPreviewHeight?: string | number;
    translations?: VideoPlayerTranslations;
    enableDebugLogs?: boolean;
}

export const VideoPlayer = React.forwardRef<HTMLButtonElement, VideoPlayerProps>(({
    video,
    videoProps,
    hlsConfig,
    width,
    height,
    controlSize,
    progressBarPreviewHeight,
    translations = defaultTranslations,
    enableDebugLogs,
    ...rest
}, ref) => {
    const containerRef = useRef<HTMLDivElement>();
    const videoRef = useRef<HTMLVideoElement>();

    const [audioTracks, setAudioTracks] = useState<MediaPlaylist[]>([]);
    const [subtitleTracks, setSubtitleTracks] = useState<MediaPlaylist[]>([]);
    const [levels, setLevels] = useState<Level[]>([]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [currentTimeSeconds, setCurrentTimeSeconds] = useState<number>();
    const [durationSeconds, setDurationSeconds] = useState<number>();
    const [volume, setVolume] = useState<number>(1);
    const [previousVolume, setPreviousVolume] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [forceShowStrips, setForceShowStrips] = useState(false);

    const containerMouseMoveTimeout = useRef<NodeJS.Timeout>();

    const handleContainerMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
        setForceShowStrips(true);

        if (containerMouseMoveTimeout?.current) {
            clearTimeout(containerMouseMoveTimeout?.current);
        }

        containerMouseMoveTimeout.current = null;
        containerMouseMoveTimeout.current = setTimeout(() => {
            setForceShowStrips(false);
        }, 1000 * 1.5);
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (typeof event.preventDefault === "function") {
            event.preventDefault();
        }

        if (typeof event.stopPropagation === "function") {
            event.stopPropagation();
        }

        switch (event.code) {
        case "Space":
            if (isPlaying) {
                handlePause();
                return;
            }

            handlePlay();
            return;
        case "ArrowLeft":
            handleDecrease10Seconds();
            return;
        case "ArrowRight":
            handleIncrease10Seconds();
            return;
        case "ArrowUp":
            return;
        case "ArrowDown":
            return;
        default:
            console.log("key event:", event);
            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    const handleEventLoadedMetadata = useCallback(() => {
        if (!videoRef?.current) {
            return;
        }

        setDurationSeconds(videoRef.current.duration);
    }, [videoRef]);

    const handleEventPlay = useCallback(() => {
        setIsPlaying(true);
    }, []);

    const handleEventPause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const handleEventPlaying = useCallback(() => {
        setIsWaiting(false);
    }, []);

    const handleEventWaiting = useCallback(() => {
        setIsWaiting(true);
    }, []);

    const handleEventVolumeChange = useCallback(() => {
        if (!videoRef?.current) {
            return;
        }

        setPreviousVolume(volume);
        setVolume(videoRef.current.volume);
    }, [videoRef, volume]);

    const handleToggleVolume = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.volume = previousVolume;
        }
    }, [videoRef, previousVolume, volume]);

    useEffect(() => {
        let currentTimeInterval;

        // document.addEventListener("keydown", handleKeyDown);
        // document.addEventListener("mousemove", handleMouseMove);

        if (videoRef?.current) {
            videoRef.current.addEventListener("loadedmetadata", handleEventLoadedMetadata);
            videoRef.current.addEventListener("play", handleEventPlay);
            videoRef.current.addEventListener("pause", handleEventPause);
            videoRef.current.addEventListener("playing", handleEventPlaying);
            videoRef.current.addEventListener("waiting", handleEventWaiting);
            videoRef.current.addEventListener("volumechange", handleEventVolumeChange);

            currentTimeInterval = setInterval(() => {
                setCurrentTimeSeconds(videoRef.current.currentTime);
            }, 200);
        }

        return () => {
            // document.removeEventListener("keydown", handleKeyDown);
            // document.removeEventListener("mousemove", handleMouseMove);

            videoRef?.current?.removeEventListener?.("loadedmetadata", handleEventLoadedMetadata);
            videoRef?.current?.removeEventListener?.("play", handleEventPlay);
            videoRef?.current?.removeEventListener?.("pause", handleEventPause);
            videoRef?.current?.removeEventListener?.("playing", handleEventPlaying);
            videoRef?.current?.removeEventListener?.("waiting", handleEventWaiting);
            videoRef?.current?.removeEventListener?.("volumechange", handleEventVolumeChange);

            if (currentTimeInterval) {
                clearInterval(currentTimeInterval);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef]);

    const handlePlay = useCallback(() => {
        if (!videoRef?.current) {
            return;
        }

        videoRef.current.play();
    }, [videoRef]);

    const handlePause = useCallback(() => {
        if (!videoRef?.current) {
            return;
        }

        videoRef.current.pause();
    }, [videoRef]);

    const handleTogglePlayback = useCallback(() => {
        if (isPlaying) {
            handlePause();
            return;
        }

        handlePlay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    const handleVolumeChange = useCallback((value: number) => {
        if (videoRef.current) {
            videoRef.current.volume = value;
        }

        setVolume(value);
        setPreviousVolume(volume);
    }, [volume]);

    const handleDecrease10Seconds = useCallback(() => {
        if (!videoRef?.current) {
            return;
        }

        if (videoRef.current.currentTime > 10) {
            videoRef.current.currentTime = videoRef.current.currentTime - 10;
            return;
        }

        videoRef.current.currentTime = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoRef, durationSeconds]);

    const handleIncrease10Seconds = useCallback(() => {
        if (!videoRef?.current) {
            return;
        }

        if (videoRef.current.currentTime + 10 < durationSeconds) {
            videoRef.current.currentTime = videoRef.current.currentTime + 10;
            return;
        }

        videoRef.current.currentTime = durationSeconds;
    }, [videoRef, durationSeconds]);

    const handleFullscreenChange = useCallback((event: Event) => {
        // setIsFullscreen(!!document.fullscreenElement);
        setIsFullscreen(!isFullscreen);
    }, [isFullscreen]);

    useEffect(() => {
        if (containerRef?.current) {
            return;
        }

        containerRef.current.addEventListener("fullscreenchange", handleFullscreenChange);
        return () =>
            containerRef?.current?.removeEventListener?.("fullscreenchange", handleFullscreenChange);

        // document.addEventListener("fullscreenchange", handleFullscreenChange);
        // return () =>
        //     document.removeEventListener("fullscreenchange", handleFullscreenChange);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggleFullscreen = useCallback(() => {
        if (isFullscreen) {
            setIsFullscreen(false);

            if (typeof document.exitFullscreen === "function") {
                document.exitFullscreen();
                return;
            }

            if (typeof (document as any).webkitExitFullscreen === "function") {
                (document as any).webkitExitFullscreen();
                return;
            }

            if (typeof (document as any).msExitFullscreen === "function") {
                (document as any).msExitFullscreen();
                return;
            }

            return;
        }

        setIsFullscreen(true);

        if (typeof containerRef.current.requestFullscreen === "function") {
            containerRef.current.requestFullscreen();
            return;
        }

        if (typeof (containerRef.current as any).webkitRequestFullscreen === "function") {
            (containerRef.current as any).webkitRequestFullscreen();
            return;
        }

        if (typeof (containerRef.current as any).msRequestFullscreen === "function") {
            (containerRef.current as any).msRequestFullscreen();
            return;
        }
    }, [isFullscreen]);

    useEffect(() => {
        let currentHls: Hls;

        const initPlayer = () => {
            if (currentHls) {
                currentHls.destroy();
            }

            const hls = new Hls({
                enableWorker: false,
                enableWebVTT: true,
                testBandwidth: true,
                progressive: true,
                startLevel: -1,
                ...hlsConfig,
            });

            hls.subtitleDisplay = true;

            if (!!videoRef?.current) {
                hls.attachMedia(videoRef.current);
            }

            hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                hls.loadSource(video?.src);
            });

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                setLevels(hls.levels);
            });

            hls.on(Hls.Events.AUDIO_TRACK_LOADED, () => {
                setAudioTracks(hls.audioTracks);
            });

            hls.on(Hls.Events.SUBTITLE_TRACKS_UPDATED, () => {
                setSubtitleTracks(hls.subtitleTracks);
            });

            hls.on(Hls.Events.FRAG_LOADED, (event, data) => {
                if (enableDebugLogs) {
                    console.log("HLS - Fragment loaded:", data);
                }

                if (!data.frag.stats) {
                    if (enableDebugLogs) {
                        console.log("    - No stats");
                    }
                    return;
                };

                if (enableDebugLogs) {
                    console.log(`    - Stats: total=${data.frag.stats.total}; loaded=${data.frag.stats.loaded}`);
                }
            });

            hls.on(Hls.Events.ERROR, async(event, err) => {
                console.log(`HLS - Error: fatal=${err?.fatal}; type=${err?.type}`);
                console.error(err);

                if (err.fatal) {
                    switch (err.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        // newHls.recoverMediaError();
                        break;
                    default:
                        initPlayer();
                        break;
                    }
                }
            });

            currentHls = hls;
        };

        if (Hls.isSupported()) {
            initPlayer();
        }

        return () => {
            if (currentHls) {
                currentHls.destroy();
            }
        };
    }, [hlsConfig, videoRef, video?.src, enableDebugLogs]);

    const iconProps = {
        size: isFullscreen ? "34px" : (controlSize as string || "20px"),
        // color: "white",
    };

    if (!Hls.isSupported()) {
        return (
            <div>
                Video Not Supported
            </div>
        );
    }

    return (
        <videoPlayerContext.Provider
            value={{
                videoFile: video,
                isWaiting,
                isPlaying,
                isFullscreen,
                durationSeconds,
                currentTimeSeconds,
                volume,
                iconProps,
            }}
        >
            <div
                ref={containerRef}
                className={cx("tt-video-player-container", {
                    "tt-video-player-container-fullscreen": isFullscreen,
                })}
                style={{ width, height }}
                onMouseMove={handleContainerMouseMove}
            >
                <video
                    {...videoProps}
                    ref={videoRef}
                    className={cx("tt-video-player-video", videoProps?.className)}
                    controls={false}
                    onClick={handleTogglePlayback}
                />
                <div
                    className={cx("tt-video-player-strips", {
                        "tt-video-player-strips-hidden": !(!isPlaying || forceShowStrips),
                    })}
                >
                    <ProgressBar
                        videoEl={videoRef?.current}
                        previewHeight={progressBarPreviewHeight}
                    />
                    <Controls>
                        <PlayControl
                            onPlay={handlePlay}
                            onPause={handlePause}
                        />
                        <TimeControl
                            position="right"
                        />
                        <VolumeControl
                            position="right"
                            container={containerRef?.current}
                            onChange={handleVolumeChange}
                            onToggle={handleToggleVolume}
                        />
                        <FullscreenControl
                            position="right"
                            onToggleFullscreen={handleToggleFullscreen}
                        />
                    </Controls>
                </div>
            </div>
        </videoPlayerContext.Provider>
    );
});

export const PreviewedVideoPlayer = withVideoPreview(VideoPlayer);
