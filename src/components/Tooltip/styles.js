import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: props.className,
}))`
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  color: white;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: absolute;
  top: 48px;
  right: -4px;
  z-index: 100;
  visibility: hidden;
`;
