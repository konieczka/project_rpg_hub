import useCharacterMetadata from "hooks/useCharacterMetadata";
import {
  AvatarContainer,
  CharacterDetailsSection,
} from "./CharacterPortrait.styles";

export const CharacterPortrait = ({ name, typeId, classId, portraitUrl }) => {
  const { classMeta, typeMeta } = useCharacterMetadata({ classId, typeId });

  return (
    <AvatarContainer>
      <img src={portraitUrl} alt="avatar" />
      <CharacterDetailsSection
        classColor={classMeta && classMeta.color}
        typeColor={typeMeta && typeMeta.color}
      >
        <h1>{name}</h1>
        {classMeta && <h2>{classMeta.name}</h2>}
        {typeMeta && <h3>{typeMeta.name}</h3>}
      </CharacterDetailsSection>
    </AvatarContainer>
  );
};
