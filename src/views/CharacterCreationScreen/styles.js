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
  user-select: none;
`;

export const FormContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  padding: 16px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  margin-top: 32px;
  width: 1200px;
  height: 1000px;
`;

export const FormColumn = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 32px;
  gap: 16px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
    border-radius: 5px;
  }
`;

export const SelectedItemInfo = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 8px;

  ul {
    width: 300px;
  }
`;
