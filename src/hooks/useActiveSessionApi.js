import { useSelector } from "react-redux";
import { firestore } from "config/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

const useActiveSessionApi = () => {
  const { activeSystem, metadataSet } = useSelector(
    (state) => state.gameSystems
  );
  const { activeSessionId } = useSelector((state) => state.sessions);
  const [synchronizedState, setSynchronizedState] = useState({
    sessionId: "",
    records: [],
  });

  useEffect(() => {
    const fetchSessionData = async () => {
      const res = await getDoc(
        doc(
          firestore,
          "sessions",
          activeSystem.systemId,
          "sessions",
          activeSessionId
        )
      );

      setSynchronizedState(res.data());
    };

    if (activeSessionId && metadataSet) {
      if (synchronizedState.sessionId) {
        const unsub = onSnapshot(
          doc(
            firestore,
            "sessions",
            activeSystem.systemId,
            "sessions",
            activeSessionId
          ),
          (res) => setSynchronizedState(res.data())
        );
      } else {
        fetchSessionData();
      }
    }
  }, [activeSessionId, activeSystem, metadataSet, synchronizedState]);

  const sendUpdate = (updatedData) => {
    console.log(updatedData);
    setDoc(
      doc(
        firestore,
        "sessions",
        activeSystem.systemId,
        "sessions",
        activeSessionId
      ),
      updatedData
    );
  };

  // SETTERS
  const handleSendRecord = (record) =>
    sendUpdate({
      ...synchronizedState,
      records: [...synchronizedState.records, record],
    });

  return {
    sessionMounted: !!synchronizedState.sessionId,
    records: synchronizedState.records,
    handleSendRecord,
  };
};

export default useActiveSessionApi;
