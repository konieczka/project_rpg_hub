import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: columns nowrap;
  padding: 16px;
`;

export const EffectItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 8px;
  color: white;
  position: relative;
  cursor: pointer;
  user-select: none;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover > .effect-tooltip {
    visibility: visible;
  }
`;

export const TooltipBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;
