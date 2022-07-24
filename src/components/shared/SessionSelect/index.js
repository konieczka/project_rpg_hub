import { useState } from "react";
import useSystemTheme from "hooks/useSystemTheme";
import useSessions from "hooks/useSessions";
import { useNavigate } from "react-router";
import { DropdownArrowRegular } from "components/shared/DropdownArrow";
import { InlineTextButton } from "components/shared/InlineTextButton";
import { ROUTES } from "routing/router";
import {
  DropdownBody,
  SessionListItem,
  SessionsList,
  TopBarContainer,
} from "./styles";

const SessionSelect = () => {
  const [isSessionsDropdownOpen, setIsSessionsDropdownOpen] = useState(false);
  const systemTheme = useSystemTheme();
  const navigate = useNavigate();
  const { fetchedSessions, activeSessionId, onSessionsSelect } = useSessions();

  if (!systemTheme) {
    return <div>Loading... </div>;
  }

  return (
    <>
      <TopBarContainer
        mainColor={systemTheme.colors.main}
        onClick={() => setIsSessionsDropdownOpen((prev) => !prev)}
      >
        Star Wars Test
        <DropdownArrowRegular
          mainColor={systemTheme.colors.main}
          isOpen={isSessionsDropdownOpen}
        />
      </TopBarContainer>
      <DropdownBody
        mainColor={systemTheme.colors.main}
        isVisible={isSessionsDropdownOpen}
      >
        <SessionsList>
          {fetchedSessions.map((session) => (
            <SessionListItem
              key={session.sessionId}
              isSelected={
                session.sessionId === activeSessionId && systemTheme.colors.main
              }
              onClick={() => onSessionsSelect(session.sessionId)}
            >
              {session.name}
            </SessionListItem>
          ))}
        </SessionsList>
        <InlineTextButton customSize="16px">+&nbsp;Nowa sesja</InlineTextButton>
        <InlineTextButton
          customSize="24px"
          onClick={() => navigate(ROUTES.systemSelectionDashboard)}
        >
          ZMIEŃ SYSTEM
        </InlineTextButton>
      </DropdownBody>
    </>
  );
};

export default SessionSelect;
