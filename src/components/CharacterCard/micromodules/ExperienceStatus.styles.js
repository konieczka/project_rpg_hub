import styled, { css } from "styled-components";

export const Container = styled.div`
  padding: 8px 16px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
  position: relative;
`;

export const ExpBar = styled.div`
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  width: 100%;
`;

export const ExpProgress = styled.div`
  height: 4px;
  background-color: #7cc662;

  ${({ percentage }) =>
    percentage &&
    css`
      width: ${percentage};
    `}
`;

export const LevelIndicator = styled.div`
  font-size: 24px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  user-select: none;

  &:hover + .exp-tooltip {
    visibility: visible;
  }
`;
