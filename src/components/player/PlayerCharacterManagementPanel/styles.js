import styled, { css } from "styled-components";

export const ModalBody = styled.div`
  display: flex;
  height: 800px;
  flex-flow: column nowrap;
  align-items: flex-start;
  position: relative;
  user-select: none;
`;

export const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;

  h2 {
    padding: 0 16px;
    margin-top: 16px;
    color: white;
  }

  h3,
  h4 {
    color: rgba(255, 255, 255, 0.7);
    padding: 0 16px;
  }

  ul {
    padding: 0 32px;
    font-size: 18px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
    list-style-type: none;

    li {
      font-weight: 500;
    }
  }

  b {
    color: white;
  }
`;

export const Row = styled(Column)`
  flex-flow: row nowrap;
  align-items: flex-start;
`;

export const AddPointButton = styled.div`
  color: white;
  display: inline-block;
  padding: 2px;
  transition-duration: 200ms;
  cursor: pointer;
  user-select: none;

  ${({ mainColor }) =>
    mainColor &&
    css`
      color: ${mainColor};
    `}

  ${({ hoverColor }) =>
    hoverColor &&
    css`
      &:hover {
        color: ${hoverColor};
      }
    `}
`;

export const LevelUpButtonsGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
