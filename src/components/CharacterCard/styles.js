import styled, { css } from "styled-components";

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid white;
  backdrop-filter: blur(10px);
  border-radius: 15px;
  width: 250px;
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
  justify-items: center;

  ${({ mainColor }) =>
    mainColor &&
    css`
      border-color: ${mainColor};
    `}
`;
