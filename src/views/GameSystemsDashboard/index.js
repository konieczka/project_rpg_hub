import { HeadingLarge } from "components/Heading";
import useGameSystems from "hooks/useGameSystems";
import {
  Container,
  SectionContainer,
  SystemDetails,
  SystemsListItem,
  SystemsListWrapper,
} from "./styles";

const GameSystemsDashboard = () => {
  const { gameSystems, activeSystem, onSystemSelect } = useGameSystems();

  console.log("systems", gameSystems, activeSystem);

  return (
    <Container>
      <SectionContainer>
        <HeadingLarge>Wybierz system</HeadingLarge>
        <SystemsListWrapper>
          {gameSystems.length
            ? gameSystems.map((system) => (
                <SystemsListItem
                  key={system.systemId}
                  onClick={() => onSystemSelect(system)}
                  isSelected={
                    activeSystem && activeSystem.systemId === system.systemId
                  }
                >
                  <img src={system.logoUrl} alt={system.name} />
                  <SystemDetails>
                    <h1>{system.name}</h1>
                    <p>{system.description}</p>
                  </SystemDetails>
                </SystemsListItem>
              ))
            : "No game systems detected."}
        </SystemsListWrapper>
      </SectionContainer>
      <SectionContainer>
        <HeadingLarge>Wybierz postać</HeadingLarge>
      </SectionContainer>
    </Container>
  );
};

export default GameSystemsDashboard;
