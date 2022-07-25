import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  color: white;
  height: calc(100%);
  width: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }
`;

export const CollapsibleItem = styled.div`
  padding: 8px 0;
`;

export const CollapsibleItemLabel = styled.div`
  font-size: 20px;
  font-weight: 600;
  user-select: none;
  cursor: pointer;

  svg {
    width: 12px;
    height: 12px;
    margin-left: 8px;
  }
`;

export const CollapsibleSection = styled.div`
  max-height: 150px;
  display: flex;
  flex-flow: column;
  padding: 8px 0;
`;

export const NestedItem = styled.div`
  cursor: pointer;
  user-select: none;
  transition-duration: 200ms;
  padding: 8px;
  width: fit-content;
  border-radius: 5px;
  position: relative;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  ${({ highlighted }) =>
    highlighted &&
    css`
      background-color: ${highlighted};
    `}
`;

export const MiniLabel = styled.div`
  position: absolute;
  bottom: -4px;
  right: -4px;
  font-size: 10px;
  font-weight: 600;

  ${({ mainColor }) =>
    mainColor &&
    css`
      color: ${mainColor};
    `}
`;
