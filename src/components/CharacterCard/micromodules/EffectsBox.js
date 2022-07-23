import { ReactComponent as BuffIcon } from "assets/buffIcon.svg";
import { ReactComponent as DebuffIcon } from "assets/debuffIcon.svg";
import Tooltip from "components/Tooltip";
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
              <strong>{effect.description}</strong>
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
              {effect.attrModifiers &&
                Object.keys(effect.attrModifiers).map((attrId) => (
                  <p key={`${attrId}-status-effect-${effect.name}`}>
                    {effect.attrModifiers[attrId] > 0 && "+"}
                    {effect.attrModifiers[attrId]} {attrId}
                  </p>
                ))}
            </TooltipBody>
          </Tooltip>
        </EffectItem>
      ))}
    </Container>
  );
};
