import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
  margin-top: 12px;
`;

export const StatusItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  color: white;
  gap: 8px;
  padding: 0 16px;
  align-items: center;

  img {
    width: 18px;
    height: 18px;
  }
`;
