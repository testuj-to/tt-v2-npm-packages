import React from "react";
import type { StoryObj, Meta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { PreviewedVideoPlayer } from ".";

export default {
    component: PreviewedVideoPlayer,
    title: "Primitives/VideoPlayer",
    parameters: {
        layout: "centered",
    },
    decorators: [
        TTContextDecorator,
    ],
} as Meta<typeof PreviewedVideoPlayer>;

export const Previewed: StoryObj<typeof PreviewedVideoPlayer> = {
    args: {
        enableDebugLogs: false,
        height: 320,
        // video: {
        //     src: "https://btcdn.org/vid/user/6159df69a18c4aa1a74883b75112d040/6159df69a18c4aa1a74883b75112d040.m3u8",
        //     isBeingProcessed: false,
        //     videoDetails: {
        //         durationMs: 32566,
        //         heightPx: 1272,
        //         orientation: "portrait",
        //         widthPx: 720,
        //     },
        // },
        video: {
            src: "https://btcdn.org/vid/user/cea215699bda4acc833d06daeec0fd76/cea215699bda4acc833d06daeec0fd76.m3u8",
            isBeingProcessed: false,
            videoDetails: {
                durationMs: 257266,
                heightPx: 1080,
                widthPx: 1920,
                orientation: "landscape",
            },
        },
        translations: {
            isBeingProcessed: "Video se zpracovává",
        },
    },
};

// const videoPlayerStoryTemplate: StoryObj<typeof PreviewedVideoPlayer> = args => (
//     <PreviewedVideoPlayer {...args} />
// );

// export const Basic = videoPlayerStoryTemplate.bind({});
// Basic.args = {
//     height: 120,
//     video: {
//         src: "https://btcdn.org/vid/user/1b0b3464e3fe41e281256ce5a8796b25/1b0b3464e3fe41e281256ce5a8796b25.m3u8",
//         isBeingProcessed: false,
//         videoDetails: {
//             durationMs: 9916,
//             heightPx: 1920,
//             orientation: "portrait",
//             widthPx: 1080,
//         },
//     },
// };
