import React, { useState } from "react";
import { Arrow } from "./Arrow";

import "./styles.css";

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

  return (
    <div className="tt-image-viewer-background" onClick={onClose}>
      <div
        className="tt-image-viewer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {!isLoaded && <div className="tt-image-viewer__placeholder">Loading...</div>}
        <img
          src={imageUrl}
          alt={altText}
          onLoad={handleImageLoad}
          style={{ display: isLoaded ? "block" : "none" }}
        />
        {controls ? (
          <div className="tt-image-viewer-controls">
            <button className="tt-image-viewer-controls__button" onClick={onClickPrevious}>
              <Arrow direction="left" />
            </button>
            <button className="tt-image-viewer-controls__button" onClick={onClickNext}>
              <Arrow direction="right" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
