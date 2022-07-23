import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 100vh;

  ${({ backgroundUrl }) =>
    backgroundUrl &&
    css`
      background: url(${backgroundUrl});
      background-size: cover;
      background-position: center;
    `}
`;
