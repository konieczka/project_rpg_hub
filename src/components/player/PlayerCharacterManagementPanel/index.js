import { useState, useEffect } from "react";
import useCharacterApi from "hooks/useCharacterApi";
import useSystemTheme from "hooks/useSystemTheme";
import { useSelector } from "react-redux";
import GenericModalContainer from "components/shared/GenericModalContainer";
import { CharacterPortrait } from "components/shared/CharacterCard/micromodules/CharacterPortrait";
import { EqStatusBox } from "components/shared/CharacterCard/micromodules/EqStatusBox";
import { StatusBox } from "components/shared/CharacterCard/micromodules/StatusBox";
import {
  Column,
  ModalBody,
  Row,
  AddPointButton,
  LevelUpButtonsGroup,
} from "./styles";
import { DoubleColumnLayout } from "components/shared/CharacterCard/styles";
import { Button } from "components/shared/Button";

const initialChangeState = {
  pointsLeft: 0,
  requestedChanges: [],
  initialized: false,
};

const PlayerCharacterManagementPanel = () => {
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const activeCharacterApi = useCharacterApi(activeCharacter.characterId || "");
  const [attrsChange, setAttrsChange] = useState(initialChangeState);
  const [skillsChange, setSkillsChange] = useState(initialChangeState);

  const { colors } = useSystemTheme();

  useEffect(() => {
    if (activeCharacterApi.characterMounted && !attrsChange.initialized) {
      setTimeout(
        () =>
          setAttrsChange({
            initialized: true,
            pointsLeft:
              activeCharacterApi.getCharacterExpBar().availableAttrPoints,
            requestedChanges: Object.fromEntries(
              activeCharacterApi
                .getCharacterBaseAttrs()
                .map((attr) => [attr.identifier, 0])
            ),
          }),
        [150]
      );
    }

    if (activeCharacterApi.characterMounted && !skillsChange.initialized) {
      setTimeout(
        () =>
          setSkillsChange({
            initialized: true,
            pointsLeft:
              activeCharacterApi.getCharacterExpBar().availableSkillPoints,
            requestedChanges: Object.fromEntries(
              activeCharacterApi
                .getCharacterSkills()
                .map((skill) => [skill.skillId, 0])
            ),
          }),
        [150]
      );
    }
  }, [activeCharacterApi, attrsChange, skillsChange]);

  const resetChanges = () => {
    setAttrsChange(initialChangeState);
    setSkillsChange(initialChangeState);
  };

  if (!activeCharacterApi.characterMounted) {
    return null;
  }

  const characterGeneralInfo = {
    ...activeCharacterApi.getCharacterGeneralData(),
    classType: activeCharacterApi.getCharacterClass(),
    type: activeCharacterApi.getCharacterType(),
  };

  const characterExpInfo = activeCharacterApi.getCharacterExpBar();
  const characterBaseAttrs = activeCharacterApi.getCharacterBaseAttrs();
  const characterSkills = activeCharacterApi.getCharacterSkills();
  const characterPerks = activeCharacterApi.getCharacterPerks();

  return (
    <GenericModalContainer label="Karta postaci">
      <ModalBody>
        <Row>
          <CharacterPortrait
            name={characterGeneralInfo.name}
            type={characterGeneralInfo.type}
            classType={characterGeneralInfo.classType}
            portraitUrl={characterGeneralInfo.portraitUrl}
          />
          <Column>
            <DoubleColumnLayout>
              <StatusBox {...activeCharacterApi.getCharacterBaseBaseStatus()} />
              <EqStatusBox {...activeCharacterApi.getCharacterEqStatus()} />
            </DoubleColumnLayout>
            <h2>Poziom: {characterExpInfo.level}</h2>
            <h3>
              XP: {characterExpInfo.points}/{characterExpInfo.nextLevelAt}
            </h3>

            <h4>Punkty rozwoju: {attrsChange.pointsLeft || "Brak"}</h4>
            <ul>
              {characterBaseAttrs.map(({ identifier, value }) => (
                <li
                  key={`character-management-${identifier}`}
                  style={{
                    width: "140px",
                    textAlign: "right",
                    marginLeft: "-24px",
                  }}
                >
                  {identifier} : {value}{" "}
                  {attrsChange.requestedChanges[identifier]
                    ? `=> ${attrsChange.requestedChanges[identifier] + value}`
                    : ""}
                  {attrsChange.pointsLeft > 0 && (
                    <AddPointButton
                      mainColor={colors.main}
                      hoverColor={colors.primary}
                      onClick={() =>
                        setAttrsChange((prev) => ({
                          ...prev,
                          pointsLeft: prev.pointsLeft - 1,
                          requestedChanges: {
                            ...prev.requestedChanges,
                            [identifier]: prev.requestedChanges[identifier] + 1,
                          },
                        }))
                      }
                    >
                      +
                    </AddPointButton>
                  )}
                </li>
              ))}
            </ul>
          </Column>
        </Row>
        <Row>
          <Column style={{ marginTop: "32px" }}>
            <h4>Punkty umiejętności: {skillsChange.pointsLeft || "Brak"}</h4>
            <ul>
              {characterSkills.map((skill) => (
                <li key={`${skill.skillId}-character-management`}>
                  <b>
                    {skill.attrs.join("/")} {skill.name}
                  </b>
                  : {skill.level}
                  {skillsChange.requestedChanges[skill.skillId]
                    ? `=> ${
                        skillsChange.requestedChanges[skill.skillId] +
                        skill.level
                      }`
                    : ""}
                  {skillsChange.pointsLeft > 0 && (
                    <AddPointButton
                      mainColor={colors.main}
                      hoverColor={colors.primary}
                      onClick={() =>
                        setSkillsChange((prev) => ({
                          ...prev,
                          pointsLeft: prev.pointsLeft - 1,
                          requestedChanges: {
                            ...prev.requestedChanges,
                            [skill.skillId]:
                              prev.requestedChanges[skill.skillId] + 1,
                          },
                        }))
                      }
                    >
                      +
                    </AddPointButton>
                  )}
                </li>
              ))}
            </ul>
            <h3 style={{ marginTop: "48px" }}>Perki</h3>
            {characterPerks.length > 0 ? (
              <ul>
                {characterPerks.map((perk) => (
                  <li key={`${perk.id}-character-management`}>
                    <b>{perk.name}</b>
                    <br /> {perk.description}
                  </li>
                ))}
              </ul>
            ) : (
              "Brak"
            )}
          </Column>
        </Row>
        {((characterExpInfo.availableSkillPoints &&
          skillsChange.initialized &&
          skillsChange.pointsLeft === 0) ||
          (characterExpInfo.availableAttrPoints &&
            attrsChange.initialized &&
            attrsChange.pointsLeft === 0)) && (
          <LevelUpButtonsGroup>
            <Button onClick={() => resetChanges()} bgColor={colors.primary}>
              Resetuj
            </Button>
            <Button
              bgColor={colors.secondary}
              onClick={() => {
                activeCharacterApi.handleLevelUp(
                  skillsChange.requestedChanges,
                  attrsChange.requestedChanges
                );
                resetChanges();
              }}
            >
              Awansuj
            </Button>
          </LevelUpButtonsGroup>
        )}
      </ModalBody>
    </GenericModalContainer>
  );
};

export default PlayerCharacterManagementPanel;
