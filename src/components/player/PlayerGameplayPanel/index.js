import { useState } from "react";
import useCharacterApi from "hooks/useCharacterApi";
import { useSelector } from "react-redux";
import CharacterCard from "components/shared/CharacterCard";
import DiceRollingDashboard from "components/shared/DiceRollingDashboard";
import MessageBox from "components/shared/MessageBox";
import { calculateNotation, getNumericInputValue } from "utils/checkEngine";
import { Container, Row, TestDescriptionInputWrapper } from "./styles";
import { TextInput } from "components/shared/Input";
import useActiveSessionApi from "hooks/useActiveSessionApi";
import { wrapMessageRecord, wrapTestRecord } from "utils/sessionRecord";

const PlayerGameplayPanel = ({ mainColor, primaryColor, secondaryColor }) => {
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const activeCharacterApi = useCharacterApi(activeCharacter.characterId || "");
  const { sessionMounted, handleSendRecord } = useActiveSessionApi();

  const [isInDraftMode, setIsInDraftMode] = useState(false);
  const [testNotation, setTestNotation] = useState([]);
  const [numericInputValue, setNumericInputValue] = useState(0);
  const [previousTests, setPreviousTests] = useState([]);
  const [testDescription, setTestDescription] = useState("");

  const [inputValue, setInputValue] = useState("");

  const toggleDraftMode = () => setIsInDraftMode((prev) => !prev);

  const resetTest = () => {
    if (isInDraftMode) {
      toggleDraftMode();
      setTestNotation([]);
      setNumericInputValue(0);
      setTestDescription("");
    }
  };

  const testNotationPush = (el) => {
    if (isInDraftMode) {
      if (
        (testNotation.length > 0 &&
          testNotation[testNotation.length - 1].type !== el.type) ||
        (testNotation.length === 0 && el.type !== "op")
      ) {
        setTestNotation((prev) => [...prev, el]);
      }
    }
  };

  const submitTest = () => {
    if (isInDraftMode && testNotation.length) {
      setPreviousTests((prev) => [...prev, testNotation]);

      if (previousTests.length >= 2) {
        previousTests.shift();
      }

      handleSendRecord(
        wrapTestRecord({
          ...calculateNotation(testNotation),
          testDescription,
        })
      );
      resetTest();
    }
  };

  const submitMessage = () => {
    if (inputValue) {
      handleSendRecord(wrapMessageRecord(inputValue));
      setInputValue("");
    }
  };

  if (!activeCharacterApi.characterMounted && !sessionMounted) {
    return null;
  }

  return (
    <Container>
      <Row>
        <CharacterCard
          mainColor={mainColor}
          characterGeneralInfo={{
            ...activeCharacterApi.getCharacterGeneralData(),
            classType: activeCharacterApi.getCharacterClass(),
            type: activeCharacterApi.getCharacterType(),
          }}
          characterEffects={activeCharacterApi.getCharacterEffects()}
          characterExpBar={activeCharacterApi.getCharacterExpBar()}
          characterBaseStatus={activeCharacterApi.getCharacterBaseStatus()}
          characterEqStatus={activeCharacterApi.getCharacterEqStatus()}
          characterAttrs={activeCharacterApi.getCharacterAttrs()}
          selectableAttrs={isInDraftMode}
          onAttrSelect={({ attrId, value }) =>
            testNotationPush(getNumericInputValue(value, attrId))
          }
        />
      </Row>
      <TestDescriptionInputWrapper>
        <h3>Opis testu (opcjonalny):</h3>
        <TextInput
          value={testDescription}
          onChange={({ target }) => setTestDescription(target.value)}
        />
      </TestDescriptionInputWrapper>
      <DiceRollingDashboard
        mainColor={mainColor}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        testNotation={testNotation}
        testNotationPush={testNotationPush}
        isInDraftMode={isInDraftMode}
        toggleDraftMode={toggleDraftMode}
        submitTest={submitTest}
        resetTest={resetTest}
        previousTests={previousTests}
        numericInputValue={numericInputValue}
        setNumericInputValue={setNumericInputValue}
        setTestNotation={setTestNotation}
        setIsInDraftMode={setIsInDraftMode}
      />
      <MessageBox
        mainColor={mainColor}
        primaryColor={primaryColor}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSubmit={submitMessage}
      />
    </Container>
  );
};

export default PlayerGameplayPanel;
