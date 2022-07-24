import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  color: rgba(255, 255, 255, 0.6);
  padding: 8px 16px;
  font-size: 17px;
`;

export const AttributeItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 48px;
  padding: 2px;
`;

export const ClickableAttributeItem = styled(AttributeItem)`
  cursor: pointer;
  user-select: none;
  transition-duration: 200ms;

  &:hover {
    color: white;
  }
`;

export const AttributeKey = styled.div``;

export const AttributeValue = styled.div``;
