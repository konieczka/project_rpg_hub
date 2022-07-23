import useSystemMetadata from "hooks/useSystemMetadata";
import { Container } from "./styles";

const CentralSection = () => {
  const { backgroundUrl, colors, description, name, systemId } =
    useSystemMetadata();

  return <Container mainColor={colors.main}>dupa</Container>;
};

export default CentralSection;
