import { Container, DoubleColumnLayout } from "./styles";
import { useSelector } from "react-redux";
import { ExperienceStatus } from "./micromodules/ExperienceStatus";
import { CharacterPortrait } from "./micromodules/CharacterPortrait";
import { StatusBox } from "./micromodules/StatusBox";
import { EqStatusBox } from "./micromodules/EqStatusBox";

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
      <DoubleColumnLayout>
        {activeCharacter.baseStatus && (
          <StatusBox {...activeCharacter.baseStatus} />
        )}
        {activeCharacter.eqStatus && (
          <EqStatusBox {...activeCharacter.eqStatus} />
        )}
      </DoubleColumnLayout>
    </Container>
  );
};

export default CharacterCard;
