import { useEffect, useRef, useState } from "react";
import { ContentBlock, ContentState, Editor, EditorState, convertFromRaw } from "draft-js";

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

const blockRendererFn = (block: ContentBlock) => {
  switch (block.getType()) {
  case "atomic":
      return {
          component: Atomic,
          editable: false,
      };
  }

  return null;
};

interface AtomicProps {
  contentState: ContentState;
  block: ContentBlock;
}

const Atomic = ({ contentState, block }: AtomicProps) => {
  const entity = contentState.getEntity(block.getEntityAt(0));

  switch (entity.getType()) {
  case "IMAGE":
      const data = entity.getData();

      return (
          <img
              className={`richtext-image ${data.className}`}
              {...data}
          />
      );
  }

  return null;
};

export interface RichTextReaderProps {
  value: RichText;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export const RichTextReader = ({ value, placeholder, className }: RichTextReaderProps) => {
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
    <div className={className}>
      <Editor
        ref={editorRef}
        readOnly
        placeholder={placeholder}
        editorState={editorState}
        blockStyleFn={blockStyleFn}
        blockRendererFn={blockRendererFn}
      />
    </div>
  );
};
