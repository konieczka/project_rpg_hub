import CentralSection from "components/shared/CentralSection";
import SessionSelect from "components/shared/SessionSelect";
import useSystemMetadata from "hooks/useSystemMetadata";
import { Container } from "./styles";

const MainGameView = () => {
  const { backgroundUrl, colors, description, name, systemId } =
    useSystemMetadata();

  return (
    <Container backgroundUrl={backgroundUrl}>
      <SessionSelect />
      <CentralSection />
    </Container>
  );
};

export default MainGameView;
