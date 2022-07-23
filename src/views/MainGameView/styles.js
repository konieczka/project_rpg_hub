import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;

  ${({ backgroundUrl }) =>
    backgroundUrl &&
    css`
      background: url(${backgroundUrl});
      background-size: cover;
      background-position: center;
    `}
`;
