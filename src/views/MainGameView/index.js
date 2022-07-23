import SessionSelect from "components/SessionSelect";
import useSystemMetadata from "hooks/useSystemMetadata";
import { Container } from "./styles";

const MainGameView = () => {
  const { backgroundUrl, colors, description, name, systemId } =
    useSystemMetadata();

  return (
    <Container backgroundUrl={backgroundUrl}>
      <SessionSelect />
    </Container>
  );
};

export default MainGameView;
