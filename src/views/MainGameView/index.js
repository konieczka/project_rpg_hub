import CentralSection from "components/shared/CentralSection";
import SessionSelect from "components/shared/SessionSelect";
import useActiveGameSystemApi from "hooks/useActiveGameSystemApi";
import useSystemTheme from "hooks/useSystemTheme";
import { Container } from "./styles";
import PlayerInventoryPanel from "components/player/PlayerInventoryPanel";
import PlayerDashboard from "components/player/PlayerDashboard";

const MainGameView = () => {
  const systemTheme = useSystemTheme();
  const { isActiveSystemMounted } = useActiveGameSystemApi();

  if (!isActiveSystemMounted || !systemTheme) {
    return <div>Loading... </div>;
  }

  // TODO: moze tutaj rozdzielimy logike dla mg i gracza

  return (
    <Container backgroundUrl={systemTheme.backgroundUrl}>
      <SessionSelect />
      <CentralSection />
      <PlayerDashboard />
    </Container>
  );
};

export default MainGameView;
