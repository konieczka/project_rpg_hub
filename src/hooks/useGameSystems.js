import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "config/firebase";
import { setActiveSystem, resetActiveSystem } from "redux/gameSystemReducer";

const useGameSystems = () => {
  const [gameSystems, setGameSystems] = useState([]);
  const { activeSystem, isSystemSelected } = useSelector(
    (state) => state.gameSystems
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGameSystems = async () => {
      const res = await getDocs(collection(firestore, "systems"));
      let convertedRes = [];
      res.forEach((doc) => convertedRes.push(doc.data()));

      setGameSystems(convertedRes);
    };

    fetchGameSystems();
  }, []);

  const onSystemSelect = (system) => {
    if (activeSystem && system.systemId === activeSystem.systemId) {
      dispatch(resetActiveSystem());
    } else {
      dispatch(setActiveSystem(system));
    }
  };

  return { gameSystems, activeSystem, onSystemSelect, isSystemSelected };
};

export default useGameSystems;
