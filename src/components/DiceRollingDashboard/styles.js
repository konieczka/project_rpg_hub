import styled, { css } from "styled-components";

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.75);
  border: 1px solid white;
  border-radius: 15px;
  padding: 16px;
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;

  ${({ customColor }) =>
    customColor &&
    css`
      border-color: ${customColor};
    `}
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
`;

export const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
`;

export const DiceButton = styled.div`
  width: 48px;
  height: 48px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  user-select: none;
  border-radius: 5px;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }

  svg {
    width: 48px;
    height: 48px;
  }
`;

export const OperationalButton = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
  color: white;
  font-weight: 600;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

export const NumericInput = styled.input`
  outline: none;
  padding: 4px;
  height: 24px;
  max-width: 64px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
`;

export const InlineLabel = styled.div`
  color: rgba(255, 255, 255, 0.75);
  font-weight: 600;
`;

export const PreviousCheck = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: -12px;
  cursor: pointer;
`;

export const RerunCheckButton = styled.div`
  font-size: 20px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  user-select: none;
  margin-left: 4px;
  padding: 4px;

  &:hover {
    color: rgba(255, 255, 255, 0.75);
  }
`;

export const NotationResult = styled.div`
  color: rgba(255, 255, 255, 0.75);
  font-size: 24px;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 12px;
`;
