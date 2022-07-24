import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 450px;
  flex-flow: column nowrap;
  justify-content: flex-end;
  padding: 16px;
  gap: 16px;
`;

export const ModalBody = styled.div`
  display: flex;
  height: 350px;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

export const ListContainer = styled.div`
  width: 50%;
`;

export const ItemDetailsBox = styled.div`
  width: 50%;
  display: flex;
  flex-flow: column nowrap;
  color: white;
  padding: 16px;
  position: relative;

  p {
    margin-bottom: 8px;
  }
  ul {
    padding: 8px 4px;
    margin-left: 8px;
  }
`;

export const ButtonsGroup = styled.div`
  position: absolute;
  display: row nowrap;
  gap: 8px;
  bottom: 0;
  right: 0;
`;
