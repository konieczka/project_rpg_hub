import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { firestore } from "config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { setActiveSystem, setMetadata } from "redux/gameSystemReducer";

// Access game system data
const useActiveGameSystemApi = () => {
  const { activeSystem } = useSelector((state) => state.gameSystems);
  const dispatch = useDispatch();

  const fetchSystemData = useCallback(async () => {
    const fetchSkills = async () => {
      const res = await getDoc(doc(firestore, "skills", activeSystem.systemId));
      dispatch(setMetadata({ type: "skills", content: res.data() }));
    };
    const fetchCharacterClasses = async () => {
      const res = await getDoc(
        doc(firestore, "characterClasses", activeSystem.systemId)
      );
      dispatch(
        setMetadata({
          type: "characterClasses",
          content: res.data(),
        })
      );
    };
    const fetchPerks = async () => {
      const res = await getDoc(doc(firestore, "perks", activeSystem.systemId));
      dispatch(setMetadata({ type: "perks", content: res.data() }));
    };
    const fetchStatusEffects = async () => {
      const res = await getDoc(
        doc(firestore, "statusEffects", activeSystem.systemId)
      );
      dispatch(
        setMetadata({
          type: "statusEffects",
          content: res.data(),
        })
      );
    };
    const fetchInventory = async () => {
      const res = await getDoc(
        doc(firestore, "inventory", activeSystem.systemId)
      );
      dispatch(
        setMetadata({
          type: "inventory",
          content: res.data(),
        })
      );
    };
    const fetchNonPlayableCharacters = async () => {
      const res = await getDoc(
        doc(firestore, "nonPlayableCharacters", activeSystem.systemId)
      );
      dispatch(
        setMetadata({
          type: "nonPlayableCharacters",
          content: res.data(),
        })
      );
    };

    fetchSkills();
    fetchCharacterClasses();
    fetchInventory();
    fetchPerks();
    fetchStatusEffects();
    fetchNonPlayableCharacters();
  }, [activeSystem, dispatch]);

  const retrieveActiveSystem = useCallback(
    async (systemId) => {
      const res = await getDoc(doc(firestore, "systems", systemId));
      dispatch(setActiveSystem(res.data()));
    },
    [dispatch]
  );

  useEffect(() => {
    if (activeSystem && !activeSystem.metadataSet) {
      fetchSystemData();
    } else if (!activeSystem) {
      let activeSystemCachedId = localStorage.getItem("activeSystemId");
      if (!activeSystemCachedId !== null) {
        retrieveActiveSystem(activeSystemCachedId);
      }
    }
  }, [activeSystem, fetchSystemData, retrieveActiveSystem]);

  return { isActiveSystemMounted: !!activeSystem };
};

export default useActiveGameSystemApi;
