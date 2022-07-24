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
import { useEffect, useRef, useState } from "react";

const RaportsList = ({
  records,
  lastElementRef,
  characterGeneralInfo,
  colors,
}) => {
  console.log("records", records);
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
      <div ref={lastElementRef}>.</div>
    </Container>
  );
};

const SessionRaportsSection = () => {
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const activeCharacterApi = useCharacterApi(activeCharacter.characterId || "");
  const [displayedRecords, setDisplayedRecords] = useState([]);

  const { sessionMounted, getRecords, refreshRecords } = useActiveSessionApi();
  const { colors } = useSystemTheme();
  const lastElementRef = useRef(null);

  useEffect(() => {
    if (sessionMounted) {
      console.log("update!", getRecords());
      setDisplayedRecords(getRecords());
    }

    if (lastElementRef.current) {
      lastElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sessionMounted, refreshRecords, getRecords]);

  if (!activeCharacterApi.characterMounted || !sessionMounted) {
    return null;
  }

  const characterGeneralInfo = {
    ...activeCharacterApi.getCharacterGeneralData(),
    classType: activeCharacterApi.getCharacterClass(),
    type: activeCharacterApi.getCharacterType(),
  };

  return (
    <>
      {displayedRecords.length > 0 && (
        <RaportsList
          records={displayedRecords}
          characterGeneralInfo={characterGeneralInfo}
          lastElementRef={lastElementRef}
          colors={colors}
        />
      )}
    </>
  );
};

export default SessionRaportsSection;
