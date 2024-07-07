import {
    FunctionComponent,
    ReactNode,
    useMemo,
    useState,
} from "react";
import cx from "classnames";

import type { VideoPlayerProps } from "./index";
import { IconProgress } from "./icons/IconProgress";
import { IconPlayerPlayFilled } from "./icons/IconPlayerPlayFilled";

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
    t(key: string, params?: object);
    children?: ReactNode;
}

export const VideoPreview = ({ video, width, height, children, t }: VideoPreviewProps) => {
    const [displayVideo, setDisplayVideo] = useState(false);

    const thumbnailImageUrl = useMemo(() => {
        if (video?.isBeingProcessed || !/\.m3u8/.test(video?.src)) {
            return null;
        }

        return String(video.src).replace(/vid/, "img/vid").replace(/\.m3u8$/, ".0000000.jpg?h=256");
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
                            <IconProgress size="32px" className="tt-video-player-control-rotating" />
                            <div>
                                {t("video_isbeingprocessed")}...
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
                                <IconPlayerPlayFilled size="32px" className="tt-video-player-preview-play-icon" />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
