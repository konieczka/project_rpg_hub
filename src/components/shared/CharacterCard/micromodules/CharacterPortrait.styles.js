import styled, { css } from "styled-components";

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column nowrap;

  img {
    width: 216px;
    height: 216px;
    border-radius: 15px;
  }
`;

export const CharacterDetailsSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 16px;
  margin-right: 48px;
  margin-top: -24px;
  color: white;

  h1,
  h2,
  h3 {
    text-shadow: -2px -2px 1px #000, 2px -2px 1px #000, -2px 2px 1px #000, 2px 2px 2px #000;
  }

  h1 {
    font-size: 28px;
  }

  h2 {
    font-size: 20px;
    font-weight: 500;
  }
  h3 {
    font-weight: 400;
  }

  ${({ classColor }) =>
    classColor &&
    css`
      h2 {
        color: ${classColor};
      }
    `}

  ${({ typeColor }) =>
    typeColor &&
    css`
      h3 {
        color: ${typeColor};
      }
    `}
`;
