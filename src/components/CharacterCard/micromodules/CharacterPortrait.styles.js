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
  margin-right: 48px;
  margin-top: -24px;
  color: white;

  h1,
  h2,
  h3 {
    filter: drop-shadow(2px 2px 1px black);
  }

  h2 {
    font-size: 22px;
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
