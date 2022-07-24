import { useSelector, useDispatch } from "react-redux";
import { firestore } from "config/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

const useCharacterApi = (characterId) => {
  const { activeSystem } = useSelector((state) => state.gameSystems);
  const dispatch = useDispatch();

  const [synchronizedState, setSynchronizedState] = useState({
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
    var unsub = () => {};
    if (activeSystem && characterId) {
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
    }

    return unsub();
  }, [characterId, activeSystem, dispatch]);

  const getCharacterGeneralData = () => ({
    name: synchronizedState.name,
    bio: synchronizedState.bio,
    portraitUrl: synchronizedState.portraitUrl,
  });

  const getCharacterClass = () =>
    activeSystem.activeSystemMetadata.classes[synchronizedState.classId];

  const getCharacterType = () =>
    activeSystem.activeSystemMetadata.types[synchronizedState.typeId];

  const getCharacterPerks = () =>
    synchronizedState.perks.map(
      (perk) => activeSystem.activeSystemMetadata.perks[perk]
    );

  const getCharacterEffects = () =>
    synchronizedState.effects.map(
      (effect) => activeSystem.activeSystemMetadata.statusEffects[effect]
    );

  return {
    getCharacterGeneralData,
    getCharacterClass,
    getCharacterType,
    getCharacterPerks,
    getCharacterEffects,
  };
};

export default useCharacterApi;
