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
