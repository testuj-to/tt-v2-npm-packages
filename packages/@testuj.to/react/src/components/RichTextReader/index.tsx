import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as Immutable from "immutable";
import punycode from "punycode";
import {
  EditorCommand,
  ContentBlock,
  RichUtils,
  Editor,
  EditorState,
  convertToRaw,
  convertFromRaw,
  Modifier,
} from "draft-js";
import { getSelectionInlineStyle } from "draftjs-utils";

import "draft-js/dist/Draft.css";
import "./styles.css";

export interface RichText {
  json: string;
}

const decodeUnicode = (str: string): number[] => punycode.ucs2.decode(str);

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
  onChange?(value: RichText);
  t: (key: string) => string;
}

export const RichTextReader = ({
  value,
  placeholder,
  readOnly,
  onChange,
  t,
}: RichTextReaderProps) => {
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

  const handleEditorStateChange = useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);
      setIsEdited(true);

      onChange?.({ json: JSON.stringify(convertToRaw(editorState.getCurrentContent())) });
    },
    [onChange]
  );

  const handleKeyCommand = useCallback((command: EditorCommand, editorState: EditorState) => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);

    if (newEditorState) {
      handleEditorStateChange(newEditorState);
      return "handled";
    }

    return "not-handled";
  }, []);

  return (
    <Editor
      ref={editorRef}
      readOnly
      placeholder={placeholder}
      editorState={editorState}
      blockStyleFn={blockStyleFn}
      handleKeyCommand={handleKeyCommand}
      onChange={handleEditorStateChange}
    />
  );
};
