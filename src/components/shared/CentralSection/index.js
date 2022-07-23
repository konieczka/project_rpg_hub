import PlayerGameplayPanel from "components/player/PlayerGameplayPanel";
import useSystemMetadata from "hooks/useSystemMetadata";
import { Container } from "./styles";

const CentralSection = () => {
  const { backgroundUrl, colors, description, name, systemId } =
    useSystemMetadata();

  // TODO: conditional rendering of this section based on GM status of the user
  return (
    <Container mainColor={colors.main}>
      <PlayerGameplayPanel
        mainColor={colors.main}
        primaryColor={colors.primary}
        secondaryColor={colors.secondary}
      />
    </Container>
  );
};

export default CentralSection;
