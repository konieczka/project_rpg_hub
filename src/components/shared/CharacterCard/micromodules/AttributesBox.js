import {
  ClickableAttributeItem,
  AttributeItem,
  AttributeKey,
  AttributeValue,
  Container,
} from "./AttributesBox.styles";
import { DebuffIndicator } from "./StatusBox";

const AttributeComponent = ({ displayAttr, isSelectable, onSelect }) => {
  if (isSelectable) {
    return (
      <ClickableAttributeItem
        key={`${displayAttr.identifier}-character-attribute`}
        onClick={() =>
          onSelect({ attrId: displayAttr.identifier, value: displayAttr.value })
        }
      >
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
      </ClickableAttributeItem>
    );
  }

  return (
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
  );
};

export const AttributesBox = ({ attrs, selectableAttrs, onAttrSelect }) => {
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
          <AttributeComponent
            key={displayAttr.attrId}
            displayAttr={displayAttr}
            isSelectable={selectableAttrs}
            onSelect={onAttrSelect}
          />
        ))}
    </Container>
  );
};
