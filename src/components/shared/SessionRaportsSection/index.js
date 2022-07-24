import moment from "moment";
import useCharacterApi from "hooks/useCharacterApi";
import useSystemTheme from "hooks/useSystemTheme";
import { useSelector } from "react-redux";
import { CharacterPortrait } from "../CharacterCard/micromodules/CharacterPortrait";
import {
  AvatarPlacer,
  Container,
  SessionRecord,
  SessionRecordBody,
  TestResult,
} from "./styles";

const testRaports = [
  {
    raportIndex: 1,
    isTest: true,
    isTextMessage: false,
    message: "",
    testData: {
      testDescription: "Przykładowy opis testu dla lepszego sesji",
      testTemplate: "STR 20  -  10 (Trudny)  -  2d6",
      testSetdown: "20  -  10  -   4 (3/1)     = 6",
      testResult: 6,
    },
    author: {
      npc: "",
      pc: "test-vader",
    },
    createdAt: "",
    postedByGm: moment().format(),
  },
  {
    raportIndex: 2,
    isTest: true,
    isTextMessage: false,
    message: "",
    testData: {
      testDescription: "Przykładowy opis testu dla lepszego sesji",
      testTemplate: "STR 20  -  10 (Trudny)  -  2d6",
      testSetdown: "20  -  10  -   4 (3/1)     = -6",
      testResult: -6,
    },
    author: {
      npc: "",
      pc: "test-vader",
    },
    createdAt: "",
    postedByGm: moment().format(),
  },
  {
    raportIndex: 3,
    isTest: false,
    message: "Ja pierdole...",
    testData: {
      testTemplate: "",
      testSetdown: "",
      testResult: null,
      testDescription: "",
    },
    author: {
      npc: "",
      pc: "test-vader",
    },
    createdAt: "",
    postedByGm: moment().format(),
  },
];

const SessionRaportsSection = () => {
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const activeCharacterApi = useCharacterApi(activeCharacter.characterId || "");
  const { colors } = useSystemTheme();

  if (!activeCharacterApi.characterMounted) {
    return null;
  }

  const characterGeneralInfo = {
    ...activeCharacterApi.getCharacterGeneralData(),
    classType: activeCharacterApi.getCharacterClass(),
    type: activeCharacterApi.getCharacterType(),
  };

  return (
    <Container>
      {testRaports.map(
        ({
          raportIndex,
          isTest,
          message,
          testData,
          author,
          createdAt,
          postedByGm,
        }) => (
          <SessionRecord>
            <AvatarPlacer>
              <CharacterPortrait
                name={characterGeneralInfo.name}
                type={characterGeneralInfo.type}
                classType={characterGeneralInfo.classType}
                portraitUrl={characterGeneralInfo.portraitUrl}
              />
            </AvatarPlacer>
            {isTest && (
              <SessionRecordBody mainColor={colors.main}>
                <h2>
                  {testData.testDescription
                    ? `TEST: ${testData.testDescription}`
                    : "TEST"}
                </h2>
                <span>{testData.testTemplate}</span>
                <strong>{testData.testSetdown}</strong>
                <TestResult
                  mainColor={
                    testData.testResult > 0 ? colors.primary : colors.secondary
                  }
                >
                  {testData.testResult > 0 ? "Pozytywny" : "Negatywny"}
                </TestResult>
              </SessionRecordBody>
            )}
            {!isTest && (
              <SessionRecordBody>
                <p dangerouslySetInnerHTML={{ __html: message }}></p>
              </SessionRecordBody>
            )}
          </SessionRecord>
        )
      )}
    </Container>
  );
};

export default SessionRaportsSection;
