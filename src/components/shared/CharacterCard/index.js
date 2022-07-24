import { useSelector } from "react-redux";
import { ExperienceStatus } from "./micromodules/ExperienceStatus";
import { CharacterPortrait } from "./micromodules/CharacterPortrait";
import { StatusBox } from "./micromodules/StatusBox";
import { EqStatusBox } from "./micromodules/EqStatusBox";
import { AttributesBox } from "./micromodules/AttributesBox";
import { EffectsBox } from "./micromodules/EffectsBox";
import { Container, DoubleColumnLayout, Wrapper } from "./styles";

const CharacterCard = ({
  mainColor,
  characterGeneralInfo,
  characterEffects,
  characterExpBar,
  characterBaseStatus,
  characterEqStatus,
  characterAttrs,
}) => {
  return (
    <Wrapper>
      {characterEffects && characterEffects.length && (
        <EffectsBox effects={characterEffects} />
      )}
      <Container mainColor={mainColor}>
        {characterExpBar && <ExperienceStatus {...characterExpBar} />}
        {characterGeneralInfo && (
          <CharacterPortrait
            name={characterGeneralInfo.name}
            type={characterGeneralInfo.type}
            classType={characterGeneralInfo.classType}
            portraitUrl={characterGeneralInfo.portraitUrl}
          />
        )}
        <DoubleColumnLayout>
          {characterBaseStatus && <StatusBox {...characterBaseStatus} />}
          {characterEqStatus && <EqStatusBox {...characterEqStatus} />}
        </DoubleColumnLayout>
        {characterAttrs && <AttributesBox attrs={characterAttrs} />}
      </Container>
    </Wrapper>
  );
};

export default CharacterCard;
