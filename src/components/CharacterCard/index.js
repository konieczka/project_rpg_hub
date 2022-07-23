import { Container } from "./styles";
import { useSelector } from "react-redux";
import { ExperienceStatus } from "./micromodules/ExperienceStatus";
import { CharacterPortrait } from "./micromodules/CharacterPortrait";

const CharacterCard = ({ mainColor }) => {
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  return (
    <Container mainColor={mainColor}>
      {activeCharacter.expBar && (
        <ExperienceStatus {...activeCharacter.expBar} />
      )}
      {activeCharacter.portraitUrl && (
        <CharacterPortrait
          name={activeCharacter.name}
          typeId={activeCharacter.typeId}
          classId={activeCharacter.classId}
          portraitUrl={activeCharacter.portraitUrl}
        />
      )}
    </Container>
  );
};

export default CharacterCard;
