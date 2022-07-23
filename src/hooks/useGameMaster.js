import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setPlayerAsGameMaster,
  unsetPlayerAsGameMaster,
} from "redux/gameMasterReducer";

const useGameMaster = () => {
  const { isPlayerLoggedInAsGm } = useSelector((state) => state.gameMaster);
  const { activeCharacter } = useSelector((state) => state.playerCharacter);
  const dispatch = useDispatch();

  const onSelectGameMasterStatus = () => {
    if (isPlayerLoggedInAsGm) {
      dispatch(unsetPlayerAsGameMaster());
    } else {
      dispatch(setPlayerAsGameMaster());
    }
  };

  useEffect(() => {
    if (activeCharacter) {
      dispatch(unsetPlayerAsGameMaster());
    }
  }, [activeCharacter, dispatch]);

  return { isPlayerLoggedInAsGm, onSelectGameMasterStatus };
};

export default useGameMaster;
