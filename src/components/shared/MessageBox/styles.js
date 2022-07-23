import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 150px;
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid white;
  border-radius: 15px;
  display: flex;
  flex-flow: column nowrap;
  padding: 16px;

  ${({ mainColor }) =>
    mainColor &&
    css`
      border-color: ${mainColor};
    `}
`;

export const EditorButtons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
  margin-top: 8px;
`;

export const EditorButton = styled.div`
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  user-select: none;
  padding: 4px;

  &:hover {
    color: white;
  }

  ${({ customColor }) =>
    customColor &&
    css`
      color: ${customColor};
    `}
`;

export const FinalizationButtons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 12px;
  margin-left: auto;
`;

export const TextInputArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  max-width: 100%;
  height: 100%;
  color: white;
  font-size: 15px;
  padding: 4px;
  font-family: Quicksand;
`;

export const TextPreviewArea = styled.div`
  max-width: 100%;
  height: 100%;
  color: white;
  font-size: 15px;
  padding: 4px;
`;
