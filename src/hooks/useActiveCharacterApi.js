import { useSelector, useDispatch } from "react-redux";
import { firestore } from "config/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

const useActiveCharacterApi = () => {
  const { activeSystem } = useSelector((state) => state.gameSystems);
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const dispatch = useDispatch();

  const [synchronizedState, setSynchronizedState] = useState(null);

  useEffect(() => {
    if (activeCharacter && activeSystem) {
      const unsub = onSnapshot(
        doc(
          firestore,
          "playerCharacters",
          activeSystem.systemId,
          "characters",
          activeCharacter.characterId
        ),
        (res) => setSynchronizedState(res.data())
      );

      return unsub();
    }
  }, [activeCharacter, activeSystem, dispatch]);

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

export default useActiveCharacterApi;
