import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background: rgba(0, 0, 0, 0.9);
  height: 100vh;
  color: white;
  justify-content: space-evenly;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding: 16px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 32px;
  height: 780px;
  width: 1200px;
`;

export const FormColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 32px;
  gap: 16px;
`;

export const SelectedItemInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;
`;
