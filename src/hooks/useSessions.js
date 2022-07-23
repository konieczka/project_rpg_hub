import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "config/firebase";
import { resetSessions, setActiveSession } from "redux/sessionsReducer";

const useSessions = () => {
  const [fetchedSessions, setFetchedSessions] = useState([]);
  const { activeSystem } = useSelector((state) => state.gameSystems);
  const { activeSessionId } = useSelector((state) => state.sessions);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSessions = async () => {
      const res = await getDocs(
        collection(firestore, `sessions/${activeSystem.systemId}/sessions`)
      );
      let convertedRes = [];
      res.forEach((doc) => convertedRes.push(doc.data()));

      setFetchedSessions(convertedRes);
    };

    if (activeSystem) {
      fetchSessions();
    } else {
      dispatch(resetSessions());
    }
  }, [activeSystem, dispatch]);

  const onSessionsSelect = (sessionId) => {
    if (activeSessionId && sessionId === activeSessionId) {
      dispatch(resetSessions());
    } else {
      dispatch(setActiveSession(sessionId));
    }
  };

  return { fetchedSessions, activeSessionId, onSessionsSelect };
};

export default useSessions;
