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
    // TODO: uwzględnić jeszcze modyfikatory z eq
    const characterEffects = getCharacterEffects();

    if (characterEffects) {
      var calculatedStatus = { ...synchronizedState.eqStatus };

      characterEffects.forEach((effect) => {
        if (effect.baseModifiers) {
          calculatedStatus = {
            ...calculatedStatus,
            atkPoints: calculatedStatus.atkPoints + effect.baseModifiers.atk,
            defPoints: calculatedStatus.defPoints + effect.baseModifiers.def,
          };
        }
      });

      return {
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
    } else return synchronizedState.eqStatus;
  };

  const getCharacterBaseStatus = () => {
    // TODO: uwzględnić jeszcze modyfikatory z eq
    const characterEffects = getCharacterEffects();

    if (characterEffects) {
      var calculatedStatus = { ...synchronizedState.baseStatus };

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

      return {
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
    } else return synchronizedState.baseStatus;
  };

  const getCharacterAttrs = () => {
    // TODO: uwzględnić jeszcze modyfikatory z eq
    const characterEffects = getCharacterEffects();

    if (characterEffects) {
      var temp = { ...synchronizedState.attrs };

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

      return Object.keys(temp).map((attrId) => ({
        identifier: attrId,
        value: temp[attrId],
        debuffStatus: determineDebuffStatus(
          synchronizedState.attrs[attrId],
          temp[attrId]
        ),
      }));
    }

    return Object.keys(synchronizedState.attrs).map((attrId) => ({
      identifier: attrId,
      value: synchronizedState.attrs[attrId],
    }));
  };

  const getCharacterInventory = () =>
    synchronizedState.inventory.map((item) => ({
      ...item,
      itemData: activeSystemMetadata.inventory[item.itemId],
      isEquipped: synchronizedState.equippedItems.includes(item.itemId),
    }));

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
  };
};

export default useCharacterApi;
