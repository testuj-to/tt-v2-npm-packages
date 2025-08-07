import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
    CompositeDecorator,
    ContentBlock,
    ContentState,
    convertFromRaw,
    Editor,
    EditorState,
} from "draft-js";

import "draft-js/dist/Draft.css";
import "./styles.css";

import { RichText } from "@lib/types";

const customStyleMap = {
    FONT_SIZE_10: {
        fontSize: "10px",
        lineHeight: "22px",
    },
    FONT_SIZE_12: {
        fontSize: "12px",
        lineHeight: "22px",
    },
    FONT_SIZE_14: {
        fontSize: "14px",
        lineHeight: "28px",
    },
    FONT_SIZE_16: {
        fontSize: "16px",
        lineHeight: "28px",
    },
    FONT_SIZE_18: {
        fontSize: "18px",
        lineHeight: "28px",
    },
    FONT_SIZE_20: {
        fontSize: "20px",
        lineHeight: "32px",
    },
    FONT_SIZE_22: {
        fontSize: "22px",
        lineHeight: "32px",
    },
};

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

const Image = (props) => {
    const { contentState, entityKey } = props;
    const data = contentState.getEntity(entityKey).getData();

    return (
        <img
            {...data}
            ref={props?.ref}
            className={`richtext-image ${data.className || ""}`}
        />
    );
};

const Atomic = forwardRef(({ contentState, block }: AtomicProps, ref) => {
    const entityKey = block.getEntityAt(0);
    const entity = contentState.getEntity(entityKey);

    switch (entity?.getType?.().toString().toUpperCase()) {
        case "IMAGE":
            return (
                <Image contentState={contentState} entityKey={entityKey} ref={ref} />
            );
    }

    return null;
});

interface LinkProps {
    contentState: ContentState;
    entityKey: string;
    children: React.ReactNode;
}

const Link = (props: LinkProps) => {
    const { contentState, entityKey } = props;
    const data = contentState.getEntity(entityKey).getData();

    return (
        <a
            // rel="noopener noreferrer"
            target="_blank"
            className={`richtext-link ${data.className || ""}`}
            href={data.href}
            aria-label={data.text || data.href}
        >
            {props?.children || data.text}
        </a>
    );
};

const decorator = new CompositeDecorator([
    {
        component: Link,
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity();

                return (
                    entityKey && contentState.getEntity(entityKey).getType() === "LINK"
                );
            }, callback);
        },
    },
    {
        component: Image,
        strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
                const entityKey = character.getEntity();

                return (
                    !!entityKey && contentState.getEntity(entityKey).getType() === "IMAGE"
                );
            }, callback);
        },
    },
]);

export interface RichTextReaderProps {
    value: RichText;
    placeholder?: string;
    readOnly?: boolean;
    className?: string;
}

export const RichTextReader = ({
    value,
    placeholder,
    className,
}: RichTextReaderProps) => {
    const editorRef = useRef<Editor>();

    const [editorState, setEditorState] = useState(
        /^\{.*\}$/.test(value?.json)
            ? EditorState.createWithContent(
                convertFromRaw(JSON.parse(value.json)),
                decorator
            )
            : EditorState.createEmpty(decorator)
    );

    useEffect(() => {
        setEditorState(
            /^\{.*\}$/.test(value?.json)
                ? EditorState.createWithContent(
                    convertFromRaw(JSON.parse(value.json)),
                    decorator
                )
                : EditorState.createEmpty(decorator)
        );
    }, [value]);

    return (
        <div className={className}>
            <Editor
                ref={editorRef}
                placeholder={placeholder}
                editorState={editorState}
                blockStyleFn={blockStyleFn}
                blockRendererFn={blockRendererFn}
                customStyleMap={customStyleMap}
                readOnly
            />
        </div>
    );
};
