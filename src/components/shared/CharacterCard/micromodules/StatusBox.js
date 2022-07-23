import HpIcon from "assets/hpIcon.png";
import MpIcon from "assets/mpIcon.png";
import { Container, StatusItem } from "./StatusBox.styles";

export const StatusBox = ({ hpPoints, hpPointsMax, mpPoints, mpPointsMax }) => {
  return (
    <Container>
      <StatusItem>
        <img src={HpIcon} alt="Health Points" />
        {hpPoints}/{hpPointsMax}
      </StatusItem>
      <StatusItem>
        <img src={MpIcon} alt="Energy Points" />
        {mpPoints}/{mpPointsMax}
      </StatusItem>
    </Container>
  );
};
