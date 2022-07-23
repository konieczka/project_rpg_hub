import { useState, useRef } from "react";
import {
  convertBbCodeToJsx,
  wrapInBold,
  wrapInItalic,
  wrapInUnderline,
} from "utils/bbCode";
import {
  Container,
  EditorButton,
  EditorButtons,
  FinalizationButtons,
  TextInputArea,
  TextPreviewArea,
} from "./styles";

const MessageBox = ({ mainColor, primaryColor }) => {
  const [inputValue, setInputValue] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const inputRef = useRef(null);

  const getSelectedText = () => {
    const selectedText = inputRef.current.value;
    const start = inputRef.current.selectionStart;
    const end = inputRef.current.selectionEnd;

    return selectedText.substring(start, end);
  };

  const handleTagPlacingWithoutSelection = () => {
    const selectedText = inputRef.current.value;
    inputRef.current.setSelectionRange(
      selectedText.length - 4,
      selectedText.length - 4
    );
    inputRef.current.focus();
  };

  return (
    <Container mainColor={mainColor}>
      {isPreview ? (
        <TextPreviewArea>{convertBbCodeToJsx(inputValue)}</TextPreviewArea>
      ) : (
        <TextInputArea
          ref={inputRef}
          value={inputValue}
          onChange={({ target }) => setInputValue(target.value)}
        />
      )}
      <EditorButtons>
        <EditorButton
          onClick={() => {
            const selection = getSelectedText();

            if (selection) {
              setInputValue((prev) =>
                prev.replace(selection, wrapInItalic(selection))
              );
            } else {
              setInputValue((prev) => `${prev} [i][/i]`);
              handleTagPlacingWithoutSelection();
            }
          }}
        >
          <i>I</i>
        </EditorButton>
        <EditorButton
          onClick={() => {
            const selection = getSelectedText();

            if (selection) {
              setInputValue((prev) =>
                prev.replace(selection, wrapInBold(selection))
              );
            } else {
              setInputValue((prev) => `${prev} [b][/b]`);
              handleTagPlacingWithoutSelection();
            }
          }}
        >
          <b>B</b>
        </EditorButton>
        <EditorButton
          onClick={() => {
            const selection = getSelectedText();

            if (selection) {
              setInputValue((prev) =>
                prev.replace(selection, wrapInUnderline(selection))
              );
            } else {
              setInputValue((prev) => `${prev} [u][/u]`);
              handleTagPlacingWithoutSelection();
            }
          }}
        >
          <u>U</u>
        </EditorButton>
        <EditorButton>
          <i>Img</i>
        </EditorButton>
        <FinalizationButtons>
          <EditorButton onClick={() => setIsPreview((prev) => !prev)}>
            Podgląd
          </EditorButton>
          <EditorButton customColor={primaryColor}>Wyślij</EditorButton>
        </FinalizationButtons>
      </EditorButtons>
    </Container>
  );
};

export default MessageBox;
