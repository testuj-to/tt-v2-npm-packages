import { useEffect, useRef, useState } from "react";
import { ContentBlock, Editor, EditorState, convertFromRaw } from "draft-js";

import "draft-js/dist/Draft.css";
import "./styles.css";

export interface RichText {
  json: string;
}

const blockStyleFn = (contentBlock: ContentBlock): string => {
  const prefix = "richtext-block";
  const classNames = [prefix];

  const blockType = contentBlock.getType();
  const blockData = contentBlock.getData();

  classNames.push(`${prefix}-${blockType}`);

  const textAlign = blockData.get("text-align");
  if (textAlign) {
    classNames.push(`${prefix}-align-${textAlign}`);
  }

  return classNames.join(" ");
};

export interface RichTextReaderProps {
  value: RichText;
  placeholder?: string;
  readOnly?: boolean;
}

export const RichTextReader = ({ value, placeholder }: RichTextReaderProps) => {
  const editorRef = useRef<Editor>();

  const [isEdited, setIsEdited] = useState(false);

  const [editorState, setEditorState] = useState(
    /^\{.*\}$/.test(value?.json)
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(value.json)))
      : EditorState.createEmpty()
  );

  useEffect(() => {
    if (!isEdited) {
      setEditorState(
        /^\{.*\}$/.test(value?.json)
          ? EditorState.createWithContent(convertFromRaw(JSON.parse(value.json)))
          : EditorState.createEmpty()
      );
    }
  }, [isEdited, value]);

  return (
    <Editor
      ref={editorRef}
      readOnly
      placeholder={placeholder}
      editorState={editorState}
      blockStyleFn={blockStyleFn}
    />
  );
};
