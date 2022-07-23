import Tooltip from "components/shared/Tooltip";
import {
  Container,
  ExpProgress,
  LevelIndicator,
  ExpBar,
} from "./ExperienceStatus.styles";

export const ExperienceStatus = ({ nextLevelAt, level, points }) => {
  return (
    <Container>
      <ExpBar>
        <ExpProgress percentage={`${(points / nextLevelAt) * 100}%`} />
      </ExpBar>
      <LevelIndicator>{level}</LevelIndicator>
      <Tooltip className="exp-tooltip">
        {points}/{nextLevelAt}
      </Tooltip>
    </Container>
  );
};
