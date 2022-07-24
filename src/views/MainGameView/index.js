import CentralSection from "components/shared/CentralSection";
import SessionSelect from "components/shared/SessionSelect";
import useActiveGameSystemApi from "hooks/useActiveGameSystemApi";
import useSystemTheme from "hooks/useSystemTheme";
import { Container } from "./styles";
import { useSelector } from "react-redux";

const MainGameView = () => {
  const systemTheme = useSystemTheme();
  const { isActiveSystemMounted } = useActiveGameSystemApi();
  const { activeCharacter } = useSelector((state) => state.playerCharacter);

  console.log("dupa", isActiveSystemMounted);

  if (!isActiveSystemMounted || !systemTheme) {
    return <div>Loading... </div>;
  }

  return (
    <Container backgroundUrl={systemTheme.backgroundUrl}>
      <SessionSelect />
      <CentralSection />
    </Container>
  );
};

export default MainGameView;
