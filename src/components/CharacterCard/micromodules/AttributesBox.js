import { useEffect, useState } from "react";
import {
  AttributeItem,
  AttributeKey,
  AttributeValue,
  Container,
} from "./AttributesBox.styles";

export const AttributesBox = ({ attrs }) => {
  const [displayAttributes, setDisplayAttributes] = useState([]);

  useEffect(() => {
    setDisplayAttributes(
      Object.keys(attrs).map((attrId) => ({
        identifier: attrId,
        value: attrs[attrId],
      }))
    );
  }, [attrs]);

  return (
    <Container>
      {displayAttributes.map((displayAttr) => (
        <AttributeItem key={`${displayAttr.identifier}-character-attribute`}>
          <AttributeKey>{displayAttr.identifier}</AttributeKey>
          <AttributeValue>{displayAttr.value}</AttributeValue>
        </AttributeItem>
      ))}
    </Container>
  );
};
