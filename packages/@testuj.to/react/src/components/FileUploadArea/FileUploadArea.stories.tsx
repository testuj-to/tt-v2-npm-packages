import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TTContextDecorator } from "../../context.stories";
import { FileUploadArea } from ".";

export default {
  component: FileUploadArea,
  title: "Primitives/FileUploadArea",
  parameters: {
    layout: "centered",
  },
  decorators: [TTContextDecorator],
} as ComponentMeta<typeof FileUploadArea>;

const fileUploadAreaStory: ComponentStory<typeof FileUploadArea> = (args) => (
  <div style={{ height: "200px", width: "300px" }}>
    <FileUploadArea {...args} />
  </div>
);

export const FileUploadAreaStory = fileUploadAreaStory.bind({});
FileUploadAreaStory.args = {};
