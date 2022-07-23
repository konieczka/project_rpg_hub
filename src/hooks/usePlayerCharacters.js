import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "config/firebase";
import {
  setActiveCharacter,
  resetActiveCharacter,
} from "redux/playerCharacterReducer";

const usePlayerCharacters = () => {
  const [playerCharacters, setPlayerCharacters] = useState([]);
  const { activeSystem } = useSelector((state) => state.gameSystems);
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const { isPlayerLoggedInAsGm } = useSelector((state) => state.gameMaster);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlayerCharacters = async () => {
      const res = await getDocs(
        collection(
          firestore,
          `playerCharacters/${activeSystem.systemId}/characters`
        )
      );
      let convertedRes = [];
      res.forEach((doc) => convertedRes.push(doc.data()));

      setPlayerCharacters(convertedRes);
    };

    if (activeSystem) {
      fetchPlayerCharacters();
    } else {
      dispatch(resetActiveCharacter());
    }
  }, [activeSystem, dispatch]);

  useEffect(() => {
    if (isPlayerLoggedInAsGm) {
      dispatch(resetActiveCharacter());
    }
  }, [isPlayerLoggedInAsGm, dispatch]);

  const onCharacterSelect = (character) => {
    if (
      activeCharacter &&
      character.characterId === activeCharacter.characterId
    ) {
      dispatch(resetActiveCharacter());
    } else {
      dispatch(setActiveCharacter(character));
    }
  };

  return { playerCharacters, activeCharacter, onCharacterSelect };
};

export default usePlayerCharacters;
