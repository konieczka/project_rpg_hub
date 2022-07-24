import styled from "styled-components";

export const Container = styled.div`
  height: 450px;
  padding: 16px;
  display: flex;
  flex-flow: column nowrap;
  gap: 16px;
  justify-content: flex-end;
`;

export const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
`;

export const TestDescriptionInputWrapper = styled.div`
  padding: 8px 16px;
  border: 1px solid white;
  border-radius: 15px;
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
  
  h3 {
    color: white;
  }
`;
