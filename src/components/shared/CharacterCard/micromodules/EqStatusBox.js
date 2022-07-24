import AtkIcon from "assets/atkIcon.png";
import DefIcon from "assets/defIcon.png";
import { DebuffIndicator } from "./StatusBox";
import { Container, StatusItem } from "./StatusBox.styles";

export const EqStatusBox = ({
  atkPoints,
  defPoints,
  atkDebuffStatus,
  defDebuffStatus,
}) => {
  return (
    <Container>
      <StatusItem>
        <img src={AtkIcon} alt="Attack Points" />
        {atkPoints}
        {atkDebuffStatus && <DebuffIndicator debuffStatus={atkDebuffStatus} />}
      </StatusItem>
      <StatusItem>
        <img src={DefIcon} alt="Defense Points" />
        {defPoints}
        {defDebuffStatus && <DebuffIndicator debuffStatus={defDebuffStatus} />}
      </StatusItem>
    </Container>
  );
};
