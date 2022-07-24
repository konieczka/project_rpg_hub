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
      {attrs.map((displayAttr) => (
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
