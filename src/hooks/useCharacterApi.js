import { useSelector, useDispatch } from "react-redux";
import { firestore } from "config/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

const determineDebuffStatus = (baseValue, newValue) => {
  if (baseValue > newValue) {
    return "debuff";
  } else if (baseValue < newValue) {
    return "buff";
  }
  return null;
};

const useCharacterApi = (characterId) => {
  const { activeSystem, activeSystemMetadata } = useSelector(
    (state) => state.gameSystems
  );
  const dispatch = useDispatch();

  const [synchronizedState, setSynchronizedState] = useState({
    characterId: "",
    name: "",
    bio: "",
    portraitUrl: "",
    classId: "",
    typeId: "",
    effects: [],
    perks: [],
  });

  console.log(characterId, synchronizedState);

  useEffect(() => {
    const fetchCharacterData = async () => {
      const res = await getDoc(
        doc(
          firestore,
          "playerCharacters",
          activeSystem.systemId,
          "characters",
          characterId
        )
      );

      setSynchronizedState(res.data());
    };

    var unsub = () => {};
    if (activeSystem && characterId) {
      if (synchronizedState.characterId) {
        unsub = onSnapshot(
          doc(
            firestore,
            "playerCharacters",
            activeSystem.systemId,
            "characters",
            characterId
          ),
          (res) => setSynchronizedState(res.data())
        );
      } else {
        fetchCharacterData();
      }
    }

    // return unsub();
  }, [characterId, activeSystem, dispatch, synchronizedState.characterId]);

  const sendUpdate = (updatedData) => {
    console.log("onUpdate", updatedData);
    setDoc(
      doc(
        firestore,
        "playerCharacters",
        activeSystem.systemId,
        "characters",
        characterId
      ),
      updatedData
    );
  };

  // GETTERS
  const getCharacterGeneralData = () => ({
    name: synchronizedState.name,
    bio: synchronizedState.bio,
    portraitUrl: synchronizedState.portraitUrl,
  });

  const getCharacterClass = () =>
    synchronizedState.classId
      ? activeSystemMetadata.characterClasses.classes[synchronizedState.classId]
      : null;

  const getCharacterType = () =>
    synchronizedState.typeId
      ? activeSystemMetadata.characterClasses.types[synchronizedState.typeId]
      : null;

  const getCharacterPerks = () =>
    synchronizedState.perks.map((perk) => activeSystemMetadata.perks[perk]);

  const getCharacterEffects = () =>
    synchronizedState.effects.map(
      (effect) => activeSystemMetadata.statusEffects[effect]
    );

  const getCharacterExpBar = () => synchronizedState.expBar;

  const getCharacterEqStatus = () => {
    var calculatedStatus = { ...synchronizedState.eqStatus };
    const characterEffects = getCharacterEffects();
    const equippedItems = getEquippedItems();

    if (characterEffects) {
      characterEffects.forEach((effect) => {
        if (effect.baseModifiers) {
          calculatedStatus = {
            ...calculatedStatus,
            atkPoints: calculatedStatus.atkPoints + effect.baseModifiers.atk,
            defPoints: calculatedStatus.defPoints + effect.baseModifiers.def,
          };
        }
      });

      calculatedStatus = {
        ...calculatedStatus,
        defDebuffStatus: determineDebuffStatus(
          synchronizedState.eqStatus.defPoints,
          calculatedStatus.defPoints
        ),
        atkDebuffStatus: determineDebuffStatus(
          synchronizedState.eqStatus.atkPoints,
          calculatedStatus.atkPoints
        ),
      };
    }

    if (equippedItems) {
      equippedItems.forEach(({ whenEquipped }) => {
        if (whenEquipped.base) {
          calculatedStatus = {
            ...calculatedStatus,
            atkPoints:
              calculatedStatus.atkPoints + whenEquipped.base.atkModifier,
            defPoints:
              calculatedStatus.defPoints + whenEquipped.base.defModifier,
          };
        }
      });

      calculatedStatus = {
        ...calculatedStatus,
        defDebuffStatus: determineDebuffStatus(
          synchronizedState.eqStatus.defPoints,
          calculatedStatus.defPoints
        ),
        atkDebuffStatus: determineDebuffStatus(
          synchronizedState.eqStatus.atkPoints,
          calculatedStatus.atkPoints
        ),
      };
    }

    return calculatedStatus;
  };

  const getCharacterBaseStatus = () => {
    var calculatedStatus = { ...synchronizedState.baseStatus };
    const characterEffects = getCharacterEffects();
    const equippedItems = getEquippedItems();

    if (characterEffects) {
      characterEffects.forEach((effect) => {
        if (effect.baseModifiers) {
          calculatedStatus = {
            ...calculatedStatus,
            hpPointsMax:
              calculatedStatus.hpPointsMax + effect.baseModifiers.maxHp,
            mpPointsMax:
              calculatedStatus.mpPointsMax + effect.baseModifiers.maxMp,
          };
        }
      });

      calculatedStatus = {
        ...calculatedStatus,
        mpDebuffStatus: determineDebuffStatus(
          synchronizedState.baseStatus.mpPointsMax,
          calculatedStatus.mpPointsMax
        ),
        hpDebuffStatus: determineDebuffStatus(
          synchronizedState.baseStatus.hpPointsMax,
          calculatedStatus.hpPointsMax
        ),
      };
    }

    if (equippedItems) {
      equippedItems.forEach(({ whenEquipped }) => {
        if (whenEquipped.base) {
          calculatedStatus = {
            ...calculatedStatus,
            hpPointsMax:
              calculatedStatus.hpPointsMax + whenEquipped.base.hpModifier,
            mpPointsMax:
              calculatedStatus.mpPointsMax + whenEquipped.base.mpModifier,
          };
        }
      });

      calculatedStatus = {
        ...calculatedStatus,
        mpDebuffStatus: determineDebuffStatus(
          synchronizedState.baseStatus.mpPointsMax,
          calculatedStatus.mpPointsMax
        ),
        hpDebuffStatus: determineDebuffStatus(
          synchronizedState.baseStatus.hpPointsMax,
          calculatedStatus.hpPointsMax
        ),
      };
    }
    return calculatedStatus;
  };

  const getCharacterAttrs = () => {
    var temp = { ...synchronizedState.attrs };
    const characterEffects = getCharacterEffects();
    const equippedItems = getEquippedItems();

    if (characterEffects) {
      characterEffects.forEach((effect) => {
        if (effect.attrsModifiers) {
          const modifiedAttrs = Object.keys(effect.attrsModifiers);

          modifiedAttrs.forEach((attrId) => {
            temp = {
              ...temp,
              [attrId]: temp[attrId] + effect.attrsModifiers[attrId],
            };
          });
        }
      });
    }

    if (equippedItems) {
      equippedItems.forEach(({ whenEquipped }) => {
        if (whenEquipped.attrs) {
          const modifiedAttrs = Object.keys(whenEquipped.attrs);

          modifiedAttrs.forEach((attrId) => {
            temp = {
              ...temp,
              [attrId]: temp[attrId] + whenEquipped.attrs[attrId],
            };
          });
        }
      });
    }

    return Object.keys(temp).map((attrId) => ({
      identifier: attrId,
      value: temp[attrId],
      debuffStatus: determineDebuffStatus(
        synchronizedState.attrs[attrId],
        temp[attrId]
      ),
    }));
  };

  const getCharacterInventory = () =>
    synchronizedState.inventory.map((item) => ({
      ...item,
      itemData: activeSystemMetadata.inventory[item.itemId],
      isEquipped: synchronizedState.equippedItems.includes(item.itemId),
    }));

  const getEquippedItems = () =>
    synchronizedState.equippedItems.map(
      (itemId) => activeSystemMetadata.inventory[itemId]
    );

  // SETTERS
  const handleEquippableItem = (itemId) => {
    if (synchronizedState.equippedItems.includes(itemId)) {
      const updatedData = {
        ...synchronizedState,
        equippedItems: synchronizedState.equippedItems.filter(
          (equippedItem) => itemId !== equippedItem
        ),
      };
      sendUpdate(updatedData);
    } else {
      const updatedData = {
        ...synchronizedState,
        equippedItems: [...synchronizedState.equippedItems, itemId],
      };
      sendUpdate(updatedData);
    }
  };

  const handleConsumableItem = (itemId) => {
    const { onUse } = activeSystemMetadata.inventory[itemId];

    const newHp = synchronizedState.baseStatus.hpPoints + onUse.hpModifier;
    const newMp = synchronizedState.baseStatus.mpPoints + onUse.mpModifier;
    const { mpPointsMax, hpPointsMax } = getCharacterBaseStatus();

    var updatedData = {
      ...synchronizedState,
      baseStatus: {
        ...synchronizedState.baseStatus,
        hpPoints: newHp > hpPointsMax ? hpPointsMax : newHp,
        mpPoints: newMp > mpPointsMax ? mpPointsMax : newMp,
      },
      inventory: synchronizedState.inventory.flatMap((item) => {
        const newItem = { ...item };

        if (itemId === item.itemId) {
          if (item.amount > 1) {
            newItem.amount = item.amount - 1;
          } else {
            return [];
          }
        }

        return newItem;
      }),
    };

    sendUpdate(updatedData);
  };

  return {
    characterMounted: !!synchronizedState.characterId,
    getCharacterGeneralData,
    getCharacterClass,
    getCharacterType,
    getCharacterPerks,
    getCharacterEffects,
    getCharacterBaseStatus,
    getCharacterExpBar,
    getCharacterEqStatus,
    getCharacterAttrs,
    getCharacterInventory,
    handleEquippableItem,
    handleConsumableItem,
  };
};

export default useCharacterApi;
