import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  height: 100%;
  width: 50%;

  background: rgba(0, 0, 0, 0.75);
  border: 2px solid white;
  backdrop-filter: blur(10px);

  ${({ mainColor }) =>
    mainColor &&
    css`
      border-color: ${mainColor};
    `}
`;
