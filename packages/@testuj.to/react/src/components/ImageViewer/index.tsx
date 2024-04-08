import React, { useEffect, useState } from "react";
import { Arrow } from "./Arrow";

import "./styles.css";
import { Spinner } from "../Spinner";

export interface ImageViewerProps {
    imageUrl: string;
    altText: string;
    onClose?: () => void;
    onClickNext?: () => void;
    onClickPrevious?: () => void;
    controls?: boolean;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
    imageUrl,
    altText,
    onClickNext,
    onClickPrevious,
    onClose,
    controls,
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") {
                onClickNext?.();
            } else if (e.key === "ArrowLeft") {
                onClickPrevious?.();
            } else if (e.key === "Escape") {
                onClose?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClickNext, onClickPrevious, onClose]);

    return (
        <div className="tt-image-viewer-background" onClick={onClose}>
            <div
                className="tt-image-viewer"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {!isLoaded && (
                    <div className="tt-image-viewer__placeholder">
                        <Spinner />
                    </div>
                )}
                <img
                    src={imageUrl}
                    alt={altText}
                    onLoad={handleImageLoad}
                    style={{ display: isLoaded ? "block" : "none" }}
                />
            </div>
            <button
                className="tt-image-viewer-controls__button tt-image-viewer__close-button"
                onClick={onClose}
            >
                <div className="tt-image-viewer__close-button__icon">✕</div>
            </button>
            {controls ? (
                <div
                    className="tt-image-viewer-controls"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <button className="tt-image-viewer-controls__button" onClick={onClickPrevious}>
                        <Arrow direction="left" />
                    </button>
                    <button className="tt-image-viewer-controls__button" onClick={onClickNext}>
                        <Arrow direction="right" />
                    </button>
                </div>
            ) : null}
        </div>
    );
};
