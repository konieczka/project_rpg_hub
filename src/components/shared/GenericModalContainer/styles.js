import styled, { css } from "styled-components";

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid white;
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 16px;
  position: relative;

  ${({ mainColor }) =>
    mainColor &&
    css`
      border-color: ${mainColor};
    `}
`;

export const Label = styled.div`
  position: absolute;
  top: -32px;
  left: 16px;
  color: white;
  font-size: 32px;
  text-shadow: -2px -2px 1px #000, 2px -2px 1px #000, -2px 2px 1px #000,
    2px 2px 2px #000;
  font-weight: 600;
  user-select: none;
  text-transform: uppercase;

  ${({ mainColor }) =>
    mainColor &&
    css`
      color: ${mainColor};
    `}
`;
