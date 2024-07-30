import React, { useCallback, useEffect, useState } from "react";

import "./styles.css";

import { Arrow } from "./Arrow";
import { Spinner } from "../Spinner";

export interface ImageViewerProps {
    imageUrl: string;
    altText: string;
    controls?: boolean;
    onClose?(): void;
    onClickNext?(): void;
    onClickPrevious?(): void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
    imageUrl,
    altText,
    controls,
    onClickNext,
    onClickPrevious,
    onClose,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const handleWindowKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "ArrowRight") {
            onClickNext?.();
            return;
        }

        if (event.key === "ArrowLeft") {
            onClickPrevious?.();
            return;
        }

        if (event.key === "Escape") {
            onClose?.();
            return;
        }
    }, [onClickNext, onClickPrevious, onClose]);

    useEffect(() => {
        window.addEventListener("keydown", handleWindowKeyDown);

        return () => {
            window.removeEventListener("keydown", handleWindowKeyDown);
        };
    }, [onClickNext, onClickPrevious, onClose]);

    return (
        <div className="tt-image-viewer-background" onClick={onClose}>
            <div
                className="tt-image-viewer"
                onClick={event =>
                    event?.stopPropagation?.()}
            >
                {!isLoaded && (
                    <div className="tt-image-viewer__placeholder">
                        <Spinner/>
                    </div>
                )}
                <img
                    src={imageUrl}
                    alt={altText}
                    style={{ display: isLoaded ? "block" : "none" }}
                    onLoad={handleImageLoad}
                />
            </div>
            <button
                className="tt-image-viewer-controls__button tt-image-viewer__close-button"
                onClick={onClose}
            >
                <div className="tt-image-viewer__close-button__icon">✕</div>
            </button>
            {!!controls && (
                <div
                    className="tt-image-viewer-controls"
                    onClick={event =>
                        event?.stopPropagation?.()}
                >
                    <button
                        className="tt-image-viewer-controls__button"
                        onClick={onClickPrevious}
                    >
                        <Arrow direction="left" />
                    </button>
                    <button
                        className="tt-image-viewer-controls__button"
                        onClick={onClickNext}
                    >
                        <Arrow direction="right" />
                    </button>
                </div>
            )}
        </div>
    );
};
