import { useState } from "react";
import useSystemMetadata from "hooks/useSystemMetadata";
import { useNavigate } from "react-router";
import { DropdownArrowRegular } from "components/DropdownArrow";
import { InlineTextButton } from "components/InlineTextButton";
import { ROUTES } from "routing/router";
import { DropdownBody, SessionsList, TopBarContainer } from "./styles";

const SessionSelect = () => {
  const [isSessionsDropdownOpen, setIsSessionsDropdownOpen] = useState(false);
  const { colors, name } = useSystemMetadata();
  const navigate = useNavigate();

  return (
    <>
      <TopBarContainer
        mainColor={colors.main}
        onClick={() => setIsSessionsDropdownOpen((prev) => !prev)}
      >
        {name}
        <DropdownArrowRegular
          mainColor={colors.main}
          isOpen={isSessionsDropdownOpen}
        />
      </TopBarContainer>
      <DropdownBody mainColor={colors.main} isVisible={isSessionsDropdownOpen}>
        <SessionsList>
          <p>[Kampania: Darth Vilenus] Igrzyska Bólu</p>
          <p>[Kampania: Darth Vilenus] Igrzyska Bólu</p>
          <p>[Kampania: Darth Vilenus] Igrzyska Bólu</p>
        </SessionsList>
        <InlineTextButton customSize="16px">+&nbsp;Nowa sesja</InlineTextButton>
        <InlineTextButton
          customSize="24px"
          onClick={() => navigate(ROUTES.mainDashboard)}
        >
          ZMIEŃ SYSTEM
        </InlineTextButton>
      </DropdownBody>
    </>
  );
};

export default SessionSelect;
