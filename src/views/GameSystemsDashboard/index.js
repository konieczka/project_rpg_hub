import { HeadingLarge } from "components/Heading";
import useGameSystems from "hooks/useGameSystems";
import usePlayerCharacters from "hooks/usePlayerCharacters";
import {
  Container,
  SectionContainer,
  ItemDetails,
  ListItem,
  ListWrapper,
} from "./styles";

const GameSystemsDashboard = () => {
  const { gameSystems, activeSystem, onSystemSelect, isSystemSelected } =
    useGameSystems();
  const { playerCharacters, activeCharacter, onCharacterSelect } =
    usePlayerCharacters();

  console.log("systems", activeSystem, playerCharacters);

  return (
    <Container>
      <SectionContainer>
        <HeadingLarge>Wybierz system</HeadingLarge>
        <ListWrapper>
          {gameSystems.length > 0
            ? gameSystems.map((system) => (
                <ListItem
                  key={system.systemId}
                  onClick={() => onSystemSelect(system)}
                  isSelected={
                    activeSystem && activeSystem.systemId === system.systemId
                  }
                >
                  <img src={system.logoUrl} alt={system.name} />
                  <ItemDetails>
                    <h1>{system.name}</h1>
                    <p>{system.description}</p>
                  </ItemDetails>
                </ListItem>
              ))
            : "Nie wykryto systemów."}
        </ListWrapper>
      </SectionContainer>
      <SectionContainer>
        <HeadingLarge>Wybierz postać</HeadingLarge>
        <ListWrapper>
          {playerCharacters.length
            ? playerCharacters.map((character) => (
                <ListItem
                  key={character.characterId}
                  isPlayerCharacter
                  onClick={() => onCharacterSelect(character)}
                  isSelected={
                    activeCharacter &&
                    activeCharacter.characterId === character.characterId
                  }
                >
                  <img src={character.portraitUrl} alt={character.name} />
                  <ItemDetails>
                    <h1>{character.name}</h1>
                    <p>{character.bio}</p>
                  </ItemDetails>
                </ListItem>
              ))
            : "Brak postaci w tym systemie."}
        </ListWrapper>
      </SectionContainer>
    </Container>
  );
};

export default GameSystemsDashboard;
