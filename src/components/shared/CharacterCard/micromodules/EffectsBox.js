import { ReactComponent as BuffIcon } from "assets/buffIcon.svg";
import { ReactComponent as DebuffIcon } from "assets/debuffIcon.svg";
import Tooltip from "components/shared/Tooltip";
import { Container, EffectItem, TooltipBody } from "./EffectsBox.styles";

const determineIfEffectIsDebuff = (effect) => {
  let buffer = 0;
  if (effect.attrModifiers) {
    Object.keys(effect.attrModifiers).forEach(
      (attrId) => (buffer += effect.attrModifiers[attrId])
    );
  }

  buffer += effect.hpModifier;
  buffer += effect.mpModifier;

  if (buffer > 0) {
    return false;
  }

  return true;
};

export const EffectsBox = ({ effects }) => {
  return (
    <Container>
      {effects.map((effect) => (
        <EffectItem key={effect.name}>
          {determineIfEffectIsDebuff(effect) ? <DebuffIcon /> : <BuffIcon />}
          {effect.name}
          <Tooltip className="effect-tooltip">
            <TooltipBody>
              {effect.description && <strong>{effect.description}</strong>}
              {effect.hpModifier && (
                <p>
                  {effect.hpModifier > 0 && "+"}
                  {effect.hpModifier} MAX HP
                </p>
              )}
              {effect.mpModifier && (
                <p>
                  {effect.mpModifier > 0 && "+"}
                  {effect.mpModifier} MAX MP
                </p>
              )}
              {effect.attrsModifiers &&
                Object.keys(effect.attrsModifiers).map((attrId) => (
                  <p key={`${attrId}-status-effect-${effect.name}`}>
                    {effect.attrsModifiers[attrId] > 0 && "+"}
                    {effect.attrsModifiers[attrId]} {attrId}
                  </p>
                ))}
              {effect.baseModifiers &&
                Object.keys(effect.baseModifiers).map((attrId) => (
                  <p key={`${attrId}-status-effect-${effect.name}`}>
                    {effect.baseModifiers[attrId] > 0 && "+"}
                    {effect.baseModifiers[attrId]} {attrId}
                  </p>
                ))}
            </TooltipBody>
          </Tooltip>
        </EffectItem>
      ))}
    </Container>
  );
};
