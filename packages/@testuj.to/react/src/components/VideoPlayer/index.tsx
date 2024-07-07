import React, {
    type MouseEvent,
    type VideoHTMLAttributes,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import cx from "classnames";
import Hls, { HlsConfig, Level, MediaPlaylist } from "hls.js";

import "./styles.css";

import { IconLoaderQuarter } from "./icons/IconLoaderQuarter";
import { IconPlayerPauseFilled } from "./icons/IconPlayerPauseFilled";
import { IconPlayerPlayFilled } from "./icons/IconPlayerPlayFilled";
import { IconMinimize } from "./icons/IconMinimize";
import { IconMaximize } from "./icons/IconMaximize";
import { formatDuration } from "./utils";
import { withVideoPreview } from "./preview";
import { VolumeControl } from "./volumeControl";

export interface VideoFile {
    src: string;
    isBeingProcessed?: boolean;
    videoDetails?: VideoFileDetails;
}

export interface VideoFileDetails {
    orientation: "landscape" | "portrait";
    widthPx: number;
    heightPx: number;
    durationMs: number;
}

export interface VideoPlayerProps {
    video: VideoFile;
    videoProps?: VideoHTMLAttributes<HTMLVideoElement>;
    hlsConfig?: HlsConfig;
    width?: number | string;
    height?: number | string;
}

export const VideoPlayer = React.forwardRef<HTMLButtonElement, VideoPlayerProps>(({
    video,
    videoProps,
    hlsConfig,
    width,
    height,
    ...rest
}, ref) => {
    const containerRef = useRef<HTMLDivElement>();
    const videoRef = useRef<HTMLVideoElement>();
    const progressBarRef = useRef<HTMLDivElement>();

    const [audioTracks, setAudioTracks] = useState<MediaPlaylist[]>([]);
    const [subtitleTracks, setSubtitleTracks] = useState<MediaPlaylist[]>([]);
    const [levels, setLevels] = useState<Level[]>([]);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const [currentTimeSeconds, setCurrentTimeSeconds] = useState<number>();
    const [durationSeconds, setDurationSeconds] = useState<number>();
    const [hoverTimeSeconds, setHoverTimeSeconds] = useState<number>(null);
    const [hoverTimePercent, setHoverTimePercent] = useState<number>(null);
    const [volume, setVolume] = useState<number>();
    const [previousVolume, setPreviousVolume] = useState<number>();
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

    // const handleMouseMove = useCallback(() => {
    //     const timeout = setTimeout(() => {
    //     }, 2000);
    // }, []);

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

        setVolume(videoRef.current.volume);
        setPreviousVolume(videoRef.current.volume);
    }, [videoRef]);

    const handleToggleVolume = useCallback(() => {
        if (!videoRef?.current) {
            return;
        }

        setVolume(previousVolume);
        setPreviousVolume(volume);
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

    const handleProgressBarClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (!videoRef?.current || !progressBarRef?.current) {
            return;
        }

        const progressBarBoundingRect = progressBarRef.current.getBoundingClientRect();

        videoRef.current.currentTime = durationSeconds * ((event.pageX - progressBarBoundingRect.x) / progressBarBoundingRect.width);
    }, [videoRef, durationSeconds]);

    const handleProgressBarMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef?.current) {
            return;
        }

        const progressBarBoundingRect = progressBarRef.current.getBoundingClientRect();

        setHoverTimeSeconds(durationSeconds * ((event.pageX - progressBarBoundingRect.x) / progressBarBoundingRect.width));
        setHoverTimePercent((((event.pageX - progressBarBoundingRect.x) / progressBarBoundingRect.width) * 10000) / 100);
    }, [durationSeconds]);

    const handleProgressBarMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
        setHoverTimeSeconds(null);
        setHoverTimePercent(null);
    }, []);

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

    const handleToggleFullScreen = useCallback(() => {
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
                console.log("fragment loaded:", data);
                if (!data.frag.stats) {
                    return;
                };

                console.log("Stats: loaded: " + data.frag.stats.loaded + " total: " + data.frag.stats.total);
            });

            hls.on(Hls.Events.ERROR, async(event, err) => {
                console.log("Hls error; event:", event);
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
    }, [hlsConfig, videoRef, video?.src]);

    const durationFormated = useMemo(() => {
        return formatDuration(durationSeconds);
    }, [durationSeconds]);

    const currentTimeFormated = useMemo(() => {
        return formatDuration(currentTimeSeconds, Math.floor(durationSeconds / 3600) >= 60);
    }, [currentTimeSeconds, durationSeconds]);

    const iconProps = {
        size: isFullscreen ? "34px" : "20px",
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
                    {hoverTimeSeconds && (
                        <div
                            className="tt-video-player-progress-bar-current-label"
                            style={{ left: `${hoverTimePercent}%` }}
                        >
                            {formatDuration(hoverTimeSeconds, Math.floor(durationSeconds / 3600) >= 60)}
                        </div>
                    )}
                </div>
                <div className="tt-video-player-controls">
                    <div className="tt-video-player-controls-left">
                        {isWaiting ? (
                            <IconLoaderQuarter
                                {...iconProps}
                                className="tt-video-player-control tt-video-player-control-rotating"
                            />
                        ) : (
                            isPlaying ? (
                                <IconPlayerPauseFilled
                                    {...iconProps}
                                    className="tt-video-player-control"
                                    onClick={handlePause}
                                />
                            ) : (
                                <IconPlayerPlayFilled
                                    {...iconProps}
                                    className="tt-video-player-control"
                                    onClick={handlePlay}
                                />
                            )
                        )}
                    </div>
                    <div className="tt-video-player-controls-right">
                        <div className="tt-video-player-control tt-video-player-control-text">
                            {currentTimeFormated} / {durationFormated}
                        </div>
                        <VolumeControl
                            value={volume}
                            iconProps={iconProps}
                            onChange={handleVolumeChange}
                        />
                        {/* <HoverCard width={280} shadow="md">
                            <HoverCard.Target>
                                {volume <= 0 ? (
                                    <IconVolumeOff
                                        {...iconProps}
                                        className={styles.control}
                                        onClick={handleToggleVolume}
                                    />
                                ) : (
                                    volume <= 0.5 ? (
                                        <IconVolume2
                                            {...iconProps}
                                            className={styles.control}
                                            onClick={handleToggleVolume}
                                        />
                                    ) : (
                                        <IconVolume
                                            {...iconProps}
                                            className={styles.control}
                                            onClick={handleToggleVolume}
                                        />
                                    )
                                )}
                            </HoverCard.Target>
                            <HoverCard.Dropdown>
                                <VolumeSlider
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                            </HoverCard.Dropdown>
                        </HoverCard> */}
                        {isFullscreen ? (
                            <IconMinimize
                                {...iconProps}
                                className="tt-video-player-control"
                                onClick={handleToggleFullScreen}
                            />
                        ) : (
                            <IconMaximize
                                {...iconProps}
                                className="tt-video-player-control"
                                onClick={handleToggleFullScreen}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export const PreviewedVideoPlayer = withVideoPreview(VideoPlayer);
