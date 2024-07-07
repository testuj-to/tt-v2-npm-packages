import React, {
    FunctionComponent,
    ReactNode,
    useMemo,
    useState,
} from "react";
import cx from "classnames";

import { IconProgress } from "./icons/IconProgress";
import { IconPlayerPlayFilled } from "./icons/IconPlayerPlayFilled";
import type { VideoPlayerProps, VideoPlayerTranslations } from ".";
import { parsePreviewImage } from "./utils";

export const defaultTranslations: VideoPlayerTranslations = {
    isBeingProcessed: "Video is being processed",
};

export const withVideoPreview = <Props extends VideoPreviewProps>(Component: FunctionComponent<Props>) => {
    return (props: Props) => {
        return (
            <VideoPreview {...props}>
                <Component
                    {...props}
                    videoProps={{
                        ...(props?.videoProps || {}),
                        autoPlay: true,
                    }}
                />
            </VideoPreview>
        );
    };
};

export interface VideoPreviewProps extends VideoPlayerProps {
    children?: ReactNode;
}

export const VideoPreview = ({
    video,
    width,
    height,
    translations = defaultTranslations,
    children,
}: VideoPreviewProps) => {
    const [displayVideo, setDisplayVideo] = useState(false);

    const thumbnailImageUrl = useMemo(() => {
        return parsePreviewImage(video, 0, 256);
    }, [video?.src, video?.isBeingProcessed]);

    return (
        <div
            className={cx("tt-video-player-aspect", {
                "tt-video-player-aspect-hoverable": !(displayVideo || video?.isBeingProcessed),
            })}
            style={{ width, height }}
            onClick={() =>
                setDisplayVideo(true)}
        >
            {displayVideo ? children : (
                <>
                    {video?.isBeingProcessed ? (
                        <div className="tt-video-player-processing">
                            <IconProgress
                                size="32px"
                                className="tt-video-player-control-rotating"
                            />
                            <div>
                                {translations?.isBeingProcessed}...
                            </div>
                        </div>
                    ) : (
                        <>
                            <img
                                src={thumbnailImageUrl}
                                className="tt-video-player-preview"
                                width={width || "auto"}
                                height={height || "auto"}
                            />
                            <div className="tt-video-player-preview-play">
                                <IconPlayerPlayFilled
                                    size="32px"
                                    className="tt-video-player-preview-play-icon"
                                />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
