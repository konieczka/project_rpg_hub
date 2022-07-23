import { HeadingLarge } from "components/Heading";
import { useNavigate } from "react-router";
import useGameMaster from "hooks/useGameMaster";
import useGameSystems from "hooks/useGameSystems";
import usePlayerCharacters from "hooks/usePlayerCharacters";
import { ROUTES } from "routing/router";
import {
  Container,
  SectionContainer,
  ItemDetails,
  ListItem,
  ListWrapper,
} from "./styles";

const GameSystemsDashboard = () => {
  const { gameSystems, activeSystem, onSystemSelect } = useGameSystems();
  const { playerCharacters, activeCharacter, onCharacterSelect } =
    usePlayerCharacters();
  const { isPlayerLoggedInAsGm, onSelectGameMasterStatus } = useGameMaster();

  const navigate = useNavigate();

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
        {activeSystem && (
          <>
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
              <ListItem>
                <ItemDetails>
                  <h1>+&nbsp;&nbsp;&nbsp;Stwórz nową postać</h1>
                </ItemDetails>
              </ListItem>
              <ListItem
                key="log-in-as-gm"
                isPlayerCharacter
                onClick={onSelectGameMasterStatus}
                isSelected={isPlayerLoggedInAsGm}
              >
                <ItemDetails>
                  <h1>Wejdź jako Mistrz Gry</h1>
                </ItemDetails>
              </ListItem>
            </ListWrapper>
            <button onClick={() => navigate(ROUTES.mainGameView)}>
              Potwierdź
            </button>
          </>
        )}
      </SectionContainer>
    </Container>
  );
};

export default GameSystemsDashboard;
