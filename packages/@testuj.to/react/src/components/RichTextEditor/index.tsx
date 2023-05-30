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
import {
  useMantineColorScheme,
  Box,
  Button,
  Divider,
  Flex,
  Menu,
  Text,
  Title,
  Tooltip,
  ButtonProps,
} from "@mantine/core";
import {
  TablerIconProps,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconBold,
  IconItalic,
  IconUnderline,
  IconLetterSpacing,
  IconList,
  IconListNumbers,
  IconCode,
  IconBlockquote,
  IconHeading,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignRight,
  IconAlignJustified,
} from "@tabler/icons";

import "draft-js/dist/Draft.css";
import "./styles.css";

export interface RichText {
  json: string;
}

const decodeUnicode = (str: string): number[] => punycode.ucs2.decode(str);

const buttonIconProps: TablerIconProps = { size: 16 };
const buttonProps: ButtonProps = {
  size: "xs",
  color: "dark",
  variant: "default",
};

const inlineStyles = {
  BOLD: { tooltipLabel: "bold", icon: IconBold },
  ITALIC: { tooltipLabel: "italic", icon: IconItalic },
  UNDERLINE: { tooltipLabel: "underline", icon: IconUnderline },
  CODE: { tooltipLabel: "monospace", icon: IconLetterSpacing },
};

const headers = {
  "header-one": { order: 1, icon: IconH1 },
  "header-two": { order: 2, icon: IconH2 },
  "header-three": { order: 3, icon: IconH3 },
  "header-four": { order: 4, icon: IconH4 },
  "header-five": { order: 5, icon: IconH5 },
  "header-six": { order: 6, icon: IconH6 },
};

const blockStyles = {
  "unordered-list-item": { tooltipLabel: "unorderedlist", icon: IconList },
  "ordered-list-item": { tooltipLabel: "orderedlist", icon: IconListNumbers },
  "code-block": { tooltipLabel: "code", icon: IconCode },
  blockquote: { tooltipLabel: "blockquote", icon: IconBlockquote },
};

const textAlignments = {
  left: { tooltipLabel: "alignleft", icon: IconAlignLeft },
  center: { tooltipLabel: "aligncenter", icon: IconAlignCenter },
  right: { tooltipLabel: "alignright", icon: IconAlignRight },
  justify: { tooltipLabel: "alignjustify", icon: IconAlignJustified },
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

export interface RichTextEditorProps {
  value: RichText;
  placeholder?: string;
  readOnly?: boolean;
  onChange?(value: RichText);
  t: (key: string) => string;
}

export const RichTextEditor = ({
  value,
  placeholder,
  readOnly,
  onChange,
  t,
}: RichTextEditorProps) => {
  const { colorScheme } = useMantineColorScheme();

  const editorRef = useRef<Editor>();

  const [hasFocus, setHasFocus] = useState(false);
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

  const hasStyledTextWithoutText = useMemo(() => {
    const contentState = editorState.getCurrentContent();
    return !contentState.hasText() && contentState.getBlockMap().first().getType() !== "unstyled";
  }, [editorState]);

  const selectedInlineStyle = useMemo((): {
    BOLD: boolean;
    CODE: boolean;
    ITALIC: boolean;
    STRIKETHROUGH: boolean;
    SUBSCRIPT: boolean;
    SUPERSCRIPT: boolean;
    UNDERLINE: boolean;
  } => {
    return getSelectionInlineStyle(editorState);
  }, [editorState]);

  // const selectedCustomInlineStyle = useMemo(() => {
  //     return getSelectionCustomInlineStyle(editorState)
  // }, [ editorState ])

  const selectedBlock = useMemo(() => {
    return editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey());
  }, [editorState]);

  const selectedHeader = useMemo(() => {
    return headers[selectedBlock.getType()] || null;
  }, [selectedBlock]);

  const { linesCount, wordsCount, charactersCount } = useMemo(() => {
    const plainText = editorState.getCurrentContent().getPlainText("");

    const blocksArray = editorState.getCurrentContent().getBlocksAsArray();
    const wordsArray = plainText
      .replace(/(?:\r\n|\r|\n)/g, " ")
      .trim()
      .match(/\S+/g);

    return {
      linesCount: blocksArray ? blocksArray.length : null,
      wordsCount: wordsArray ? wordsArray.length : 0,
      charactersCount: decodeUnicode(plainText.replace(/(?:\r\n|\r|\n)/g, "").trim()).length,
    };
  }, [editorState]);

  const handleEditorStateChange = useCallback(
    (editorState: EditorState) => {
      setEditorState(editorState);
      setIsEdited(true);

      onChange?.({ json: JSON.stringify(convertToRaw(editorState.getCurrentContent())) });
    },
    [onChange]
  );

  const focusEditor = useCallback(() => {
    if (editorRef?.current) {
      editorRef.current.focus();
    }
  }, [editorRef?.current]);

  const handleKeyCommand = useCallback((command: EditorCommand, editorState: EditorState) => {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);

    if (newEditorState) {
      handleEditorStateChange(newEditorState);
      return "handled";
    }

    return "not-handled";
  }, []);

  const handleUndo = useCallback(() => {
    handleEditorStateChange(EditorState.undo(editorState));
  }, [editorState]);

  const handleRedo = useCallback(() => {
    handleEditorStateChange(EditorState.redo(editorState));
  }, [editorState]);

  const handleToggleInlineStyle = useCallback(
    (inlineStyle: string) => {
      return (event: MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault?.();

        const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
        handleEditorStateChange(newState);
      };
    },
    [editorState]
  );

  const handleToggleBlockType = useCallback(
    (blockType: string) => {
      return (event: MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault?.();

        handleEditorStateChange(RichUtils.toggleBlockType(editorState, blockType));
      };
    },
    [editorState]
  );

  const handleToggleTextAlignment = useCallback(
    (alignment: string) => {
      return (event: MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault?.();

        handleEditorStateChange(
          EditorState.push(
            editorState,
            Modifier.setBlockData(
              editorState.getCurrentContent(),
              editorState.getSelection(),
              Immutable.Map({ "text-align": alignment })
            ),
            "change-block-data"
          )
        );
      };
    },
    [editorState]
  );

  return (
    <Flex direction="column" sx={{ borderCollapse: "collapse" }}>
      <Flex
        direction="row"
        wrap="wrap"
        sx={(theme) => ({
          display: readOnly ? "none" : undefined,
          padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
          border: "1px solid",
          borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4],
          borderBottom: "none",
          borderTopLeftRadius: theme.radius.sm,
          borderTopRightRadius: theme.radius.sm,
        })}
      >
        <Button.Group>
          <Tooltip label={t("richtext_undo")} withinPortal>
            <Button {...buttonProps} onMouseDown={handleUndo}>
              <IconArrowBackUp {...buttonIconProps} />
            </Button>
          </Tooltip>
          <Tooltip label={t("richtext_redo")} withinPortal>
            <Button {...buttonProps} onMouseDown={handleRedo}>
              <IconArrowForwardUp {...buttonIconProps} />
            </Button>
          </Tooltip>
        </Button.Group>
        <Divider mx="md" orientation="vertical" />
        <Button.Group>
          {Object.keys(inlineStyles).map((key, index) => {
            const Icon = inlineStyles[key].icon;

            return (
              <Tooltip
                key={`${index}${key}`}
                label={t(`richtext_${inlineStyles[key].tooltipLabel}`)}
                withinPortal
              >
                <Button
                  {...buttonProps}
                  variant={
                    selectedInlineStyle[key]
                      ? colorScheme === "dark"
                        ? "white"
                        : "filled"
                      : "default"
                  }
                  onMouseDown={handleToggleInlineStyle(key)}
                >
                  <Icon {...buttonIconProps} />
                </Button>
              </Tooltip>
            );
          })}
        </Button.Group>
        <Divider mx="md" orientation="vertical" />
        <Button.Group>
          <Menu>
            <Menu.Target>
              <Tooltip label={t("richtext_heading")} withinPortal>
                <Button
                  {...buttonProps}
                  variant={
                    selectedHeader ? (colorScheme === "dark" ? "white" : "filled") : "default"
                  }
                >
                  {selectedHeader ? (
                    <selectedHeader.icon {...buttonIconProps} />
                  ) : (
                    <IconHeading {...buttonIconProps} />
                  )}
                </Button>
              </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
              {Object.keys(headers).map((key, index) => {
                const Icon = headers[key].icon;

                return (
                  <Menu.Item
                    key={`${index}${key}`}
                    icon={<Icon {...buttonIconProps} />}
                    onClick={handleToggleBlockType(key)}
                  >
                    <Title order={headers[key].order}>{t("richtext_heading")}</Title>
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>
          {Object.keys(blockStyles).map((key, index) => {
            const Icon = blockStyles[key].icon;

            return (
              <Tooltip
                key={`${index}${key}`}
                label={t(`richtext_${blockStyles[key].tooltipLabel}`)}
                withinPortal
              >
                <Button
                  {...buttonProps}
                  variant={
                    selectedBlock.getType() === key
                      ? colorScheme === "dark"
                        ? "white"
                        : "filled"
                      : "default"
                  }
                  onMouseDown={handleToggleBlockType(key)}
                >
                  <Icon {...buttonIconProps} />
                </Button>
              </Tooltip>
            );
          })}
        </Button.Group>
        <Divider mx="md" orientation="vertical" />
        <Button.Group>
          {Object.keys(textAlignments).map((key, index) => {
            const Icon = textAlignments[key].icon;

            return (
              <Tooltip
                key={`${index}${key}`}
                label={t(`richtext_${textAlignments[key].tooltipLabel}`)}
                withinPortal
              >
                <Button
                  {...buttonProps}
                  variant={
                    selectedBlock.getData().get("text-align") === key
                      ? colorScheme === "dark"
                        ? "white"
                        : "filled"
                      : "default"
                  }
                  onMouseDown={handleToggleTextAlignment(key)}
                >
                  <Icon {...buttonIconProps} />
                </Button>
              </Tooltip>
            );
          })}
        </Button.Group>
        <Box sx={{ flex: 1 }} />
      </Flex>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
          border: "1px solid",
          borderColor: hasFocus
            ? theme.colorScheme === "dark"
              ? theme.colors.blue[8]
              : theme.colors.blue[6]
            : theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[4],
          borderRadius: readOnly ? theme.radius.sm : undefined,
          minWidth: 0,
          width: "100%",
          appearance: "none",
          position: "relative",
          "& .DraftEditor-root": {
            padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
            minHeight: "6rem",
            cursor: "text",
          },
          "& .public-DraftEditorPlaceholder-root": {
            display: hasStyledTextWithoutText ? "none" : undefined,
          },
        })}
        onClick={focusEditor}
      >
        <Editor
          ref={editorRef}
          readOnly={readOnly}
          placeholder={placeholder}
          editorState={editorState}
          blockStyleFn={blockStyleFn}
          handleKeyCommand={handleKeyCommand}
          onChange={handleEditorStateChange}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
        />
      </Box>
      <Flex
        direction="row"
        wrap="wrap"
        justify="center"
        sx={(theme) => ({
          display: readOnly ? "none" : undefined,
          padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[1],
          border: "1px solid",
          borderColor: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[4],
          borderTop: "none",
          borderBottomLeftRadius: theme.radius.sm,
          borderBottomRightRadius: theme.radius.sm,
        })}
      >
        <Text fz="sm" c={colorScheme === "dark" ? "dark.0" : "gray"}>
          {t("richtext_lines")}: {linesCount}
        </Text>
        <Divider mx="md" orientation="vertical" />
        <Text fz="sm" c={colorScheme === "dark" ? "dark.0" : "gray"}>
          {t("richtext_words")}: {wordsCount}
        </Text>
        <Divider mx="md" orientation="vertical" />
        <Text fz="sm" c={colorScheme === "dark" ? "dark.0" : "gray"}>
          {t("richtext_characters")}: {charactersCount}
        </Text>
      </Flex>
    </Flex>
  );
};
