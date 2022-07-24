import { useState } from "react";
import useCharacterApi from "hooks/useCharacterApi";
import { useSelector } from "react-redux";
import GenericModalContainer from "components/shared/GenericModalContainer";
import InteractiveList from "components/shared/InteractiveList";
import { Container } from "./styles";

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
        <InteractiveList listData={getInventoryReadyToDisplay()} />
      </GenericModalContainer>
    </Container>
  );
};

export default PlayerInventoryPanel;
