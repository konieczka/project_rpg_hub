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
  RecordTimestamp,
} from "./styles";
import useActiveSessionApi from "hooks/useActiveSessionApi";
import { convertBbCodeToJsx } from "utils/bbCode";

const SessionRaportsSection = () => {
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const activeCharacterApi = useCharacterApi(activeCharacter.characterId || "");
  const { sessionMounted, records } = useActiveSessionApi();
  const { colors } = useSystemTheme();

  if (!activeCharacterApi.characterMounted || !sessionMounted) {
    return null;
  }

  const characterGeneralInfo = {
    ...activeCharacterApi.getCharacterGeneralData(),
    classType: activeCharacterApi.getCharacterClass(),
    type: activeCharacterApi.getCharacterType(),
  };

  return (
    <Container>
      {records.map(
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
            <RecordTimestamp>
              {moment(createdAt).format("HH:m MMM Do YY")}
            </RecordTimestamp>
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
                <strong>{testData.testRundown}</strong>
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
                <p>{convertBbCodeToJsx(message)}</p>
              </SessionRecordBody>
            )}
          </SessionRecord>
        )
      )}
    </Container>
  );
};

export default SessionRaportsSection;
