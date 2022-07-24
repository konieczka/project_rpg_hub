import {
  AvatarContainer,
  CharacterDetailsSection,
} from "./CharacterPortrait.styles";

export const CharacterPortrait = ({ name, type, classType, portraitUrl }) => {
  return (
    <AvatarContainer>
      <img src={portraitUrl} alt="avatar" />
      <CharacterDetailsSection
        classColor={classType.color}
        typeColor={type.color}
      >
        <h1>{name}</h1>
        <h2>{classType.name}</h2>
        <h3>{type.name}</h3>
      </CharacterDetailsSection>
    </AvatarContainer>
  );
};
