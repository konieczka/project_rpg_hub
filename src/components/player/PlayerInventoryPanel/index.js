import { useState, useEffect } from "react";
import useCharacterApi from "hooks/useCharacterApi";
import useSystemTheme from "hooks/useSystemTheme";
import { useSelector } from "react-redux";
import GenericModalContainer from "components/shared/GenericModalContainer";
import InteractiveList from "components/shared/InteractiveList";
import { Button } from "components/shared/Button";
import {
  ButtonsGroup,
  Container,
  ItemDetailsBox,
  ListContainer,
  ModalBody,
} from "./styles";

const INVENTORY_CATEGORIES = [
  {
    id: "weapon",
    label: "Broń",
  },
  {
    id: "armor",
    label: "Pancerz",
  },
  {
    id: "consumable",
    label: "Użytkowe",
  },
  {
    id: "key",
    label: "Fabularne",
  },
  {
    id: "misc",
    label: "Pozostałe",
  },
];

const PlayerInventoryPanel = () => {
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const activeCharacterApi = useCharacterApi(activeCharacter.characterId || "");
  const { colors } = useSystemTheme();

  const [selectedItemId, setSelectedItemId] = useState("");
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    if (selectedItemId) {
      setItemDetails(
        activeCharacterApi
          .getCharacterInventory()
          .find((item) => item.itemId === selectedItemId)
      );
    } else {
      setItemDetails(null);
    }
  }, [selectedItemId]);

  if (!activeCharacterApi.characterMounted) {
    return null;
  }

  const getInventoryReadyToDisplay = () => {
    const formattedList = activeCharacterApi
      .getCharacterInventory()
      .map((item) => ({
        id: item.itemId,
        highlighted: item.isEquipped,
        miniLabel: item.isEquipped && "Wyposażone",
        label:
          item.amount > 1
            ? `${item.itemData.name} (${item.amount})`
            : item.itemData.name,
        category: item.itemData.category,
      }));

    return INVENTORY_CATEGORIES.map((category) => ({
      ...category,
      items: formattedList.filter((item) => item.category === category.id),
    }));
  };

  return (
    <Container>
      <GenericModalContainer label="Ekwipunek">
        <ModalBody>
          <ListContainer>
            <InteractiveList
              listData={getInventoryReadyToDisplay()}
              onSelectItem={(itemId) =>
                setSelectedItemId((prev) => (prev === itemId ? "" : itemId))
              }
            />
          </ListContainer>
          {itemDetails && (
            <ItemDetailsBox>
              <h3>
                {itemDetails.itemData.name} ({itemDetails.amount})
              </h3>
              <p>{itemDetails.itemData.description}</p>
              {itemDetails.itemData.whenEquipped && (
                <ul>
                  {itemDetails.itemData.whenEquipped.attrs &&
                    Object.keys(itemDetails.itemData.whenEquipped.attrs).map(
                      (attrId) => (
                        <li key={`${attrId}-modifier-by-item`}>
                          {itemDetails.itemData.whenEquipped.attrs[attrId]}{" "}
                          {attrId}
                        </li>
                      )
                    )}
                  {itemDetails.itemData.whenEquipped.base && (
                    <>
                      {itemDetails.itemData.whenEquipped.base.atkModifier >
                        0 && (
                        <li>
                          {itemDetails.itemData.whenEquipped.base.atkModifier}{" "}
                          ATK
                        </li>
                      )}
                      {itemDetails.itemData.whenEquipped.base.defModifier >
                        0 && (
                        <li>
                          {itemDetails.itemData.whenEquipped.base.defModifier}{" "}
                          DEF
                        </li>
                      )}
                      {itemDetails.itemData.whenEquipped.base.hpModifier >
                        0 && (
                        <li>
                          {itemDetails.itemData.whenEquipped.base.hpModifier} HP
                        </li>
                      )}
                      {itemDetails.itemData.whenEquipped.base.mpModifier >
                        0 && (
                        <li>
                          {itemDetails.itemData.whenEquipped.base.mpModifier} MP
                        </li>
                      )}
                    </>
                  )}
                </ul>
              )}
              {itemDetails.itemData.itemPerks && (
                <ul>
                  {itemDetails.itemData.itemPerks.map((perk) => (
                    <li key={`${perk}-perk`}>{perk}</li>
                  ))}
                </ul>
              )}
              <ButtonsGroup>
                {itemDetails.itemData.whenEquipped && (
                  <Button
                    bgColor={
                      itemDetails.isEquipped ? colors.secondary : colors.primary
                    }
                    onClick={() => {
                      activeCharacterApi.handleEquippableItem(selectedItemId);
                      setItemDetails((current) => ({
                        ...current,
                        isEquipped: !current.isEquipped,
                      }));
                    }}
                  >
                    {itemDetails.isEquipped ? "Zdejmij" : "Wyposaż"}
                  </Button>
                )}
                {itemDetails.itemData.onUse && (
                  <Button bgColor={colors.primary}>Użyj</Button>
                )}
              </ButtonsGroup>
            </ItemDetailsBox>
          )}
        </ModalBody>
      </GenericModalContainer>
    </Container>
  );
};

export default PlayerInventoryPanel;
