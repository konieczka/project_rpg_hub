import { Button } from "components/shared/Button";
import { ReactComponent as D4Icon } from "assets/d4icon.svg";
import { ReactComponent as D6Icon } from "assets/d6icon.svg";
import { ReactComponent as D8Icon } from "assets/d8icon.svg";
import { ReactComponent as D10Icon } from "assets/d10icon.svg";
import { ReactComponent as D12Icon } from "assets/d12icon.svg";
import { ReactComponent as D20Icon } from "assets/d20icon.svg";
import {
  DICES,
  LOGICAL_OPERATORS,
  getCheckNotation,
  getNumericInputValue,
} from "utils/checkEngine";
import {
  Container,
  DiceButton,
  Row,
  NumericInput,
  OperationalButton,
  Column,
  InlineLabel,
  PreviousCheck,
  RerunCheckButton,
  NotationResult,
} from "./styles";

const DiceRollingDashboard = ({
  mainColor,
  primaryColor,
  secondaryColor,
  testNotation,
  testNotationPush,
  isInDraftMode,
  toggleDraftMode,
  submitTest,
  resetTest,
  previousTests,
  numericInputValue,
  setNumericInputValue,
  setTestNotation,
  setIsInDraftMode,
}) => {
  return (
    <Container customColor={mainColor}>
      <Row>
        <Column>
          <Button
            bgColor={primaryColor}
            isDisabled={isInDraftMode}
            onClick={() => {
              if (!isInDraftMode) {
                toggleDraftMode();
              }
            }}
          >
            Rozpocznij
          </Button>
          <Button
            bgColor={secondaryColor}
            onClick={resetTest}
            isDisabled={!isInDraftMode}
          >
            Anuluj
          </Button>
        </Column>
        <DiceButton onClick={() => testNotationPush(DICES.d4)}>
          <D4Icon />
        </DiceButton>
        <DiceButton onClick={() => testNotationPush(DICES.d6)}>
          <D6Icon />
        </DiceButton>
        <DiceButton onClick={() => testNotationPush(DICES.d8)}>
          <D8Icon />
        </DiceButton>
        <DiceButton onClick={() => testNotationPush(DICES.d10)}>
          <D10Icon />
        </DiceButton>
        <DiceButton onClick={() => testNotationPush(DICES.d12)}>
          <D12Icon />
        </DiceButton>
        <DiceButton onClick={() => testNotationPush(DICES.d20)}>
          <D20Icon />
        </DiceButton>
        <Column>
          <OperationalButton
            onClick={() => testNotationPush(LOGICAL_OPERATORS.add)}
          >
            +
          </OperationalButton>
          <OperationalButton
            onClick={() => testNotationPush(LOGICAL_OPERATORS.subtract)}
          >
            -
          </OperationalButton>
        </Column>
        <Column>
          <OperationalButton
            onClick={() => testNotationPush(LOGICAL_OPERATORS.multiply)}
          >
            X
          </OperationalButton>
          <OperationalButton
            onClick={() => testNotationPush(LOGICAL_OPERATORS.divide)}
          >
            /
          </OperationalButton>
        </Column>
        <Column>
          <OperationalButton>Broń</OperationalButton>
          <OperationalButton>Pancerz</OperationalButton>
        </Column>
        <Column>
          <NumericInput
            type="number"
            value={numericInputValue}
            onChange={({ target }) => {
              if (target.value > 999) {
                setNumericInputValue(999);
              } else if (target.value < -999) {
                setNumericInputValue(-999);
              } else setNumericInputValue(target.value);
            }}
          />
          <OperationalButton
            onClick={() => {
              if (numericInputValue && isInDraftMode) {
                testNotationPush(getNumericInputValue(numericInputValue));
              }
            }}
          >
            Umieść
          </OperationalButton>
        </Column>
      </Row>
      <Row>
        <Column>
          <InlineLabel>Poprzednie testy</InlineLabel>
          {previousTests.length ? (
            previousTests.map((previous) => (
              <PreviousCheck>
                {getCheckNotation(previous)}
                <RerunCheckButton
                  onClick={() => {
                    setIsInDraftMode(true);
                    setTestNotation(previous);
                  }}
                >
                  ⟲
                </RerunCheckButton>
              </PreviousCheck>
            ))
          ) : (
            <PreviousCheck>Brak zapisanych w pamięci testów</PreviousCheck>
          )}
        </Column>
        <NotationResult>
          {!isInDraftMode && "Tryb tworzenia testu wyłączony"}
          {isInDraftMode &&
            (testNotation.length
              ? getCheckNotation(testNotation)
              : "Tryb tworzenia testu włączony")}
        </NotationResult>
        <Button
          bgColor={primaryColor}
          isDisabled={!isInDraftMode || !testNotation.length}
          onClick={submitTest}
        >
          SPRAWDŹ
        </Button>
      </Row>
    </Container>
  );
};

export default DiceRollingDashboard;
