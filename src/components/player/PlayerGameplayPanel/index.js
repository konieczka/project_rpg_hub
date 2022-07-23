import CharacterCard from "components/shared/CharacterCard";
import DiceRollingDashboard from "components/shared/DiceRollingDashboard";
import MessageBox from "components/shared/MessageBox";
import { Container, Row } from "./styles";

const PlayerGameplayPanel = ({ mainColor, primaryColor, secondaryColor }) => {
  return (
    <Container>
      <Row>
        <CharacterCard mainColor={mainColor} />
      </Row>
      <DiceRollingDashboard
        mainColor={mainColor}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <MessageBox mainColor={mainColor} primaryColor={primaryColor} />
    </Container>
  );
};

export default PlayerGameplayPanel;
