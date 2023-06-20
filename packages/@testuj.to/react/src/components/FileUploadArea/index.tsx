import { useRef, useState } from "react";
import cx from "classnames";

import "./styles.css";

import { IconPlus } from "./IconPlus";

export interface FileUploadAreaProps {
  onChange?: (value: FileList) => void;
  text?: string;
  className?: string;
}

export const FileUploadArea = ({ onChange, text, className }: FileUploadAreaProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    onChange?.(files);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement | HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <form
      className={cx("tt-file-upload-area", className)}
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="file"
        className="tt-file-upload-area-input"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
        ref={inputRef}
      />
      <label
        htmlFor="input-file-upload"
        id="tt-file-upload-area-label"
        className={dragActive ? "drag-active" : ""}
      >
        <button className="upload-button" onClick={onButtonClick}>
          <IconPlus />
        </button>
        <div className="tt-file-upload-area-label-text">{text}</div>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </label>
    </form>
  );
};
