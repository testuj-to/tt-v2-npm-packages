import { useCallback, useRef, useState } from "react";
import cx from "classnames";

import "./styles.css";

import { IconPlus } from "./IconPlus";

export interface FileUploadAreaProps {
    text?: string;
    className?: string;
    onChange?(value: FileList): void;
}

export const FileUploadArea = ({ text, className, onChange }: FileUploadAreaProps) => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrag = useCallback((event: React.DragEvent<HTMLDivElement | HTMLFormElement>) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();

        if (event?.type === "dragenter" || event?.type === "dragover") {
            setDragActive(true);
            return;
        }

        if (event?.type === "dragleave") {
            setDragActive(false);
        }
    }, [setDragActive]);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event?.preventDefault?.();
        event?.stopPropagation?.();

        setDragActive(false);

        if (event?.dataTransfer?.files && event?.dataTransfer?.files?.[0]) {
            onChange?.(event?.dataTransfer?.files);
        }
    }, [setDragActive, onChange]);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event?.preventDefault?.();

        if (event?.target?.files && event?.target?.files?.[0]) {
            onChange?.(event?.target?.files);
        }
    }, [setDragActive, onChange]);

    const onButtonClick = useCallback(() => {
        inputRef.current?.click?.();
    }, [inputRef?.current]);

    return (
        <form
            className={cx("tt-file-upload-area", className)}
            onDragEnter={handleDrag}
            onSubmit={event =>
                event?.preventDefault?.()}
        >
            <input
                ref={inputRef}
                type="file"
                className="tt-file-upload-area-input"
                id="input-file-upload"
                onChange={handleChange}
                multiple
            />
            <label
                htmlFor="input-file-upload"
                id="tt-file-upload-area-label"
                className={dragActive ? "drag-active" : ""}
            >
                <button
                    className="upload-button"
                    onClick={onButtonClick}
                >
                    <IconPlus/>
                </button>
                <div className="tt-file-upload-area-label-text">{text}</div>
                {dragActive && (
                    <div
                        id="drag-file-element"
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    />
                )}
            </label>
        </form>
    );
};
