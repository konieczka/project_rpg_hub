import styled, { css } from "styled-components";

export const HeadingLarge = styled.div`
  font-size: 48px;
  color: white;
  font-weight: 700;

  ${({ customColor }) =>
    customColor &&
    css`
      color: ${customColor};
    `}
`;
