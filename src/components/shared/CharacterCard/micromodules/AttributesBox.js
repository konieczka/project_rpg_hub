import {
  AttributeItem,
  AttributeKey,
  AttributeValue,
  Container,
} from "./AttributesBox.styles";
import { DebuffIndicator } from "./StatusBox";

export const AttributesBox = ({ attrs }) => {
  return (
    <Container>
      {attrs
        .sort((a, b) => {
          if (a.identifier > b.identifier) {
            return -1;
          }
          if (a.identifier < b.identifier) {
            return 1;
          }
          return 0;
        })
        .map((displayAttr) => (
          <AttributeItem key={`${displayAttr.identifier}-character-attribute`}>
            <AttributeKey>{displayAttr.identifier}</AttributeKey>
            <AttributeValue>
              {displayAttr.value}
              {displayAttr.debuffStatus && (
                <>
                  &nbsp;
                  <DebuffIndicator debuffStatus={displayAttr.debuffStatus} />
                </>
              )}
            </AttributeValue>
          </AttributeItem>
        ))}
    </Container>
  );
};
