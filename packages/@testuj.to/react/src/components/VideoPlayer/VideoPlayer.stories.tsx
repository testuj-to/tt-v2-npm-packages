import { ComponentStory, ComponentMeta } from "@storybook/react";

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
} as ComponentMeta<typeof PreviewedVideoPlayer>;

const videoPlayerStoryTemplate: ComponentStory<typeof PreviewedVideoPlayer> = args => (
    <PreviewedVideoPlayer {...args} />
);

export const Basic = videoPlayerStoryTemplate.bind({});
Basic.args = {
    height: 120,
    video: {
        src: "https://btcdn.org/vid/user/1b0b3464e3fe41e281256ce5a8796b25/1b0b3464e3fe41e281256ce5a8796b25.m3u8",
        isBeingProcessed: false,
        videoDetails: {
            durationMs: 9916,
            heightPx: 1920,
            orientation: "portrait",
            widthPx: 1080,
        },
    },
};
