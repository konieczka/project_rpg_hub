import styled, { css } from "styled-components";

export const InlineTextButton = styled.div`
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  user-select: none;

  &:hover {
    color: white;
  }

  font-size: 12px;

  ${({ customSize }) =>
    customSize &&
    css`
      font-size: ${customSize};
    `}
`;
