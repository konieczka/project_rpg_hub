import HpIcon from "assets/hpIcon.png";
import MpIcon from "assets/mpIcon.png";
import { ReactComponent as BuffIcon } from "assets/buffIcon.svg";
import { ReactComponent as DebuffIcon } from "assets/debuffIcon.svg";
import { Container, StatusItem } from "./StatusBox.styles";

const DebuffIndicator = ({ debuffStatus }) => {
  if (debuffStatus === "debuff") {
    return <DebuffIcon />;
  } else if (debuffStatus === "buff") {
    return <BuffIcon />;
  }
};

export const StatusBox = ({
  hpPoints,
  hpPointsMax,
  mpPoints,
  mpPointsMax,
  mpDebuffStatus,
  hpDebuffStatus,
}) => {
  return (
    <Container>
      <StatusItem>
        <img src={HpIcon} alt="Health Points" />
        {hpPoints}/{hpPointsMax}
        {hpDebuffStatus && <DebuffIndicator debuffStatus={hpDebuffStatus} />}
      </StatusItem>
      <StatusItem>
        <img src={MpIcon} alt="Energy Points" />
        {mpPoints}/{mpPointsMax}
        {mpDebuffStatus && <DebuffIndicator debuffStatus={mpDebuffStatus} />}
      </StatusItem>
    </Container>
  );
};
