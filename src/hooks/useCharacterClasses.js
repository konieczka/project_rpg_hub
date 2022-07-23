import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "config/firebase";
import {
  setClasses,
  setTypes,
  unsetAllCharacterTypes,
} from "redux/characterClassesReducer";

const useCharactersClasses = () => {
  const { activeSystem } = useSelector((state) => state.gameSystems);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await getDocs(
        collection(
          firestore,
          `characterClasses/${activeSystem.systemId}/classes`
        )
      );
      let convertedRes = [];
      res.forEach((doc) => convertedRes.push(doc.data()));

      dispatch(
        setClasses({
          arr: convertedRes.filter((i) => !i.label),
          label: convertedRes.filter((i) => !!i.label)[0].label,
        })
      );
    };

    const fetchTypes = async () => {
      const res = await getDocs(
        collection(firestore, `characterClasses/${activeSystem.systemId}/types`)
      );
      let convertedRes = [];
      res.forEach((doc) => convertedRes.push(doc.data()));

      dispatch(
        setTypes({
          arr: convertedRes.filter((i) => !i.label),
          label: convertedRes.filter((i) => !!i.label)[0].label,
        })
      );
    };

    if (activeSystem) {
      fetchClasses();
      fetchTypes();
    } else {
      dispatch(unsetAllCharacterTypes());
    }
  }, [activeSystem, dispatch]);
};

export default useCharactersClasses;
