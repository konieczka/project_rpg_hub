import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background: rgba(0, 0, 0, 0.9);
  height: 100vh;
  color: white;
  justify-content: space-evenly;
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 48px;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
  margin-top: 32px;
`;

export const ListItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 15px;
  cursor: pointer;
  user-select: none;

  img {
    width: 92px;
    height: 92px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      background: rgba(255, 255, 255, 0.15);
    `}

  ${({ isPlayerCharacter }) =>
    isPlayerCharacter &&
    css`
      img {
        border-radius: 5px;
      }
    `}
`;

export const ItemDetails = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
`;
