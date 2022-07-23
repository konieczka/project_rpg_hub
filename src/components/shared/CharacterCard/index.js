import { useSelector } from "react-redux";
import { ExperienceStatus } from "./micromodules/ExperienceStatus";
import { CharacterPortrait } from "./micromodules/CharacterPortrait";
import { StatusBox } from "./micromodules/StatusBox";
import { EqStatusBox } from "./micromodules/EqStatusBox";
import { AttributesBox } from "./micromodules/AttributesBox";
import { EffectsBox } from "./micromodules/EffectsBox";
import { Container, DoubleColumnLayout, Wrapper } from "./styles";

const CharacterCard = ({ mainColor }) => {
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  return (
    <Wrapper>
      {activeCharacter.effects && activeCharacter.effects.length && (
        <EffectsBox effects={activeCharacter.effects} />
      )}
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
        {activeCharacter.attrs && (
          <AttributesBox attrs={activeCharacter.attrs} />
        )}
      </Container>
    </Wrapper>
  );
};

export default CharacterCard;
