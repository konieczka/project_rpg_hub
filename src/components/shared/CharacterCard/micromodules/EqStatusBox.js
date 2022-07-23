import AtkIcon from "assets/atkIcon.png";
import DefIcon from "assets/defIcon.png";
import { Container, StatusItem } from "./StatusBox.styles";

export const EqStatusBox = ({ atkPoints, defPoints }) => {
  return (
    <Container>
      <StatusItem>
        <img src={AtkIcon} alt="Attack Points" />
        {atkPoints}
      </StatusItem>
      <StatusItem>
        <img src={DefIcon} alt="Defense Points" />
        {defPoints}
      </StatusItem>
    </Container>
  );
};
