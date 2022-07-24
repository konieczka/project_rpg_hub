import styled, { css } from "styled-components";

export const Button = styled.div`
  border-radius: 5px;
  padding: 8px;
  color: white;
  cursor: pointer;
  user-select: none;
  width: fit-content;
  min-width: 82px;

  font-weight: 600;
  transition-duration: 200ms;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: white;
  }

  ${({ bgColor }) =>
    bgColor &&
    css`
      background-color: ${bgColor};
      &:hover {
        background-color: white;
        color: ${bgColor};
      }
    `}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      background-color: grey;
      cursor: not-allowed;

      &:hover {
        background-color: grey;
        color: white;
      }
    `}
`;

export const OutlinePanelButton = styled.div`
  border-radius: 5px;
  padding: 8px 32px;
  color: white;
  cursor: pointer;
  user-select: none;
  width: fit-content;
  min-width: 120px;
  text-shadow: -2px -2px 1px #000, 2px -2px 1px #000, -2px 2px 1px #000,
    2px 2px 2px #000;
  font-weight: 600;
  font-size: 24px;
  transition-duration: 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  text-transform: uppercase;

  ${({ bgColor }) =>
    bgColor &&
    css`
      border: 2px solid ${bgColor};
      color: ${bgColor};
    `}

  ${({ hoverColor }) =>
    hoverColor &&
    css`
      &:hover {
        border: 2px solid ${hoverColor};
        color: ${hoverColor};
      }
    `}
`;
