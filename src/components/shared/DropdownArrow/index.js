import styled, { css } from "styled-components";
import { ReactComponent as DropdownIcon } from "assets/dropdown-arrow.svg";

export const DropdownArrowRegular = styled(DropdownIcon)`
  ${({ mainColor }) =>
    mainColor &&
    css`
      fill: ${mainColor};
    `}

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;
