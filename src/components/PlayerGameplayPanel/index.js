import MessageBox from "components/MessageBox";
import { Container } from "./styles";

const PlayerGameplayPanel = ({ mainColor, primaryColor, secondaryColor }) => {
  return (
    <Container>
      <MessageBox mainColor={mainColor} primaryColor={primaryColor} />
    </Container>
  );
};

export default PlayerGameplayPanel;
