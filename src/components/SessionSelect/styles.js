import styled, { css } from "styled-components";

export const TopBarContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;
  cursor: pointer;

  background: rgba(0, 0, 0, 0.75);
  border: 2px solid white;
  backdrop-filter: blur(10px);
  border-radius: 0px 0px 15px 0px;
  font-size: 24px;
  user-select: none;

  ${({ mainColor }) =>
    mainColor &&
    css`
      color: ${mainColor};
      border-color: ${mainColor};
    `}
`;

export const DropdownBody = styled.div`
  display: none;
  flex-flow: column nowrap;
  padding: 16px;
  padding-right: 48px;
  gap: 16px;
  position: absolute;
  top: 64px;
  left: 0;

  background: rgba(0, 0, 0, 0.75);
  border: 2px solid white;
  backdrop-filter: blur(10px);
  border-radius: 0px 0px 15px 0px;

  ${({ isVisible }) =>
    isVisible &&
    css`
      display: flex;
    `}

  ${({ mainColor }) =>
    mainColor &&
    css`
      color: ${mainColor};
      border-color: ${mainColor};
    `}
`;

export const SessionsList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 48px;
`;

export const SessionListItem = styled.div`
  color: rgba(255, 255, 255, 0.75);
  user-select: none;
  cursor: pointer;

  &:hover {
    color: white;
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: ${isSelected};
    `}
`;
