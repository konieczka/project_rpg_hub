import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 72px;
  padding: 16px;
  height: 100%;
  margin-top: 70px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 627px;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.15);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
`;

export const SessionRecord = styled.div`
  display: flex;
  position: relative;
  width: 596px;
  min-height: 128px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  padding: 16px;

  * {
    color: white;
  }
`;

export const SessionRecordBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-left: 156px;

  h2 {
    font-size: 20px;
    margin-bottom: 8px;
    text-shadow: -2px -2px 1px #000, 2px -2px 1px #000, -2px 2px 1px #000;
  }

  span {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.75);
  }

  ${({ mainColor }) =>
    mainColor &&
    css`
      h2 {
        color: ${mainColor};
      }
    `}
`;

export const AvatarPlacer = styled.div`
  transform: scale(0.7);
  position: absolute;
  top: -96px;
  left: -40px;
`;

export const TestResult = styled.div`
  position: absolute;
  right: 4px;
  bottom: 4px;
  font-weight: 600;
  font-size: 24px;
  text-transform: uppercase;
  text-shadow: -2px -2px 1px #000, 2px -2px 1px #000, -2px 2px 1px #000;

  ${({ mainColor }) =>
    mainColor &&
    css`
      color: ${mainColor};
    `}
`;

export const RecordTimestamp = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 0.6);
  top: -18px;
  right: 0;
  font-size: 12px;
`;
