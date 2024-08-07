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
  padding-bottom: 16px;

  ${({ mainColor }) =>
    mainColor &&
    css`
      border-color: ${mainColor};
    `}
`;

export const DoubleColumnLayout = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
