import DiceRollingDashboard from "components/DiceRollingDashboard";
import MessageBox from "components/MessageBox";
import { Container } from "./styles";

const PlayerGameplayPanel = ({ mainColor, primaryColor, secondaryColor }) => {
  return (
    <Container>
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
