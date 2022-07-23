import PlayerGameplayPanel from "components/PlayerGameplayPanel";
import useSystemMetadata from "hooks/useSystemMetadata";
import { Container } from "./styles";

const CentralSection = () => {
  const { backgroundUrl, colors, description, name, systemId } =
    useSystemMetadata();

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
