import { useSelector } from "react-redux";
import { firestore } from "config/firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCallbackRef } from "use-callback-ref";

const useActiveSessionApi = () => {
  const [refreshRecords, setRefreshRecords] = useState(2342);
  const { activeSystem, metadataSet } = useSelector(
    (state) => state.gameSystems
  );
  const { activeSessionId } = useSelector((state) => state.sessions);
  const synchronizedState = useCallbackRef(null, () =>
    setRefreshRecords(Math.random())
  );

  useEffect(() => {
    if (activeSessionId) {
      const unsub = onSnapshot(
        doc(
          firestore,
          "sessions",
          activeSystem.systemId,
          "sessions",
          activeSessionId
        ),
        (res) => {
          synchronizedState.current = res.data();
        }
      );
    }
  }, [activeSessionId, activeSystem, synchronizedState]);

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

  // GETTERS
  const getRecords = () => synchronizedState.current.records;

  // SETTERS
  const handleSendRecord = (record) =>
    sendUpdate({
      ...synchronizedState.current,
      records: [...synchronizedState.current.records, record],
    });

  return {
    sessionMounted: !!synchronizedState.current,
    refreshRecords,
    getRecords,
    handleSendRecord,
  };
};

export default useActiveSessionApi;
