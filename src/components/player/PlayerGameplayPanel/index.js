import useCharacterApi from "hooks/useCharacterApi";
import { useSelector } from "react-redux";
import CharacterCard from "components/shared/CharacterCard";
import DiceRollingDashboard from "components/shared/DiceRollingDashboard";
import MessageBox from "components/shared/MessageBox";
import { Container, Row } from "./styles";

const PlayerGameplayPanel = ({ mainColor, primaryColor, secondaryColor }) => {
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const activeCharacterApi = useCharacterApi(activeCharacter.characterId || "");

  if (!activeCharacterApi.characterMounted) {
    return null;
  }

  return (
    <Container>
      <Row>
        <CharacterCard
          mainColor={mainColor}
          characterGeneralInfo={{
            ...activeCharacterApi.getCharacterGeneralData(),
            classType: activeCharacterApi.getCharacterClass(),
            type: activeCharacterApi.getCharacterType(),
          }}
          characterEffects={activeCharacterApi.getCharacterEffects()}
          characterExpBar={activeCharacterApi.getCharacterExpBar()}
          characterBaseStatus={activeCharacterApi.getCharacterBaseStatus()}
          characterEqStatus={activeCharacterApi.getCharacterEqStatus()}
        />
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
