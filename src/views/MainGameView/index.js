import CentralSection from "components/shared/CentralSection";
import SessionSelect from "components/shared/SessionSelect";
import useActiveCharacterApi from "hooks/useActiveCharacterApi";
import useActiveGameSystemApi from "hooks/useActiveGameSystemApi";
import useSystemTheme from "hooks/useSystemTheme";
import { Container } from "./styles";

const MainGameView = () => {
  const systemTheme = useSystemTheme();
  const { isActiveSystemMounted } = useActiveGameSystemApi();
  const characterApi = useActiveCharacterApi();

  console.log(characterApi);

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
