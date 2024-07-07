import React, {
    type ReactElement,
    Children,
} from "react";

export * from "./play";
export * from "./time";
export * from "./volume";
export * from "./fullscreen";

export interface ControlProps {
    position?: "left" | "right";
}

export interface ControlsProps {
    children?: ReactElement<ControlProps> | ReactElement<ControlProps>[];
}

export const Controls = ({ children }: ControlsProps) => {
    const [left, right] = Children
        .toArray(children)
        .reduce<[ReactElement<ControlProps>[], ReactElement<ControlProps>[]]>((items, child: ReactElement<ControlProps>) => {
            if (child?.props?.position === "right") {
                items[1].push(child);
            } else {
                items[0].push(child);
            }

            return items;
        }, [[], []]);

    return (
        <div className="tt-video-player-controls">
            <div className="tt-video-player-controls-left">
                {left}
            </div>
            <div className="tt-video-player-controls-right">
                {right}
            </div>
        </div>
    );
};
