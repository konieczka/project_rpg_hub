import PlayerGameplayPanel from "components/player/PlayerGameplayPanel";
import useSystemTheme from "hooks/useSystemTheme";
import { Container } from "./styles";

const CentralSection = () => {
  const systemTheme = useSystemTheme();

  if (!systemTheme) {
    return <div>Loading... </div>;
  }

  // TODO: conditional rendering of this section based on GM status of the user
  return (
    <Container mainColor={systemTheme.colors.main}>
      <PlayerGameplayPanel
        mainColor={systemTheme.colors.main}
        primaryColor={systemTheme.colors.primary}
        secondaryColor={systemTheme.colors.secondary}
      />
    </Container>
  );
};

export default CentralSection;
