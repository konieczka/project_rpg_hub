import { useState } from "react";
import useSystemMetadata from "hooks/useSystemMetadata";
import useSessions from "hooks/useSessions";
import { useNavigate } from "react-router";
import { DropdownArrowRegular } from "components/DropdownArrow";
import { InlineTextButton } from "components/InlineTextButton";
import { ROUTES } from "routing/router";
import {
  DropdownBody,
  SessionListItem,
  SessionsList,
  TopBarContainer,
} from "./styles";

const SessionSelect = () => {
  const [isSessionsDropdownOpen, setIsSessionsDropdownOpen] = useState(false);
  const { colors, name } = useSystemMetadata();
  const navigate = useNavigate();
  const { fetchedSessions, activeSessionId, onSessionsSelect } = useSessions();

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
          {fetchedSessions.map((session) => (
            <SessionListItem
              key={session.sessionId}
              isSelected={session.sessionId === activeSessionId && colors.main}
              onClick={() => onSessionsSelect(session.sessionId)}
            >
              {session.name}
            </SessionListItem>
          ))}
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
