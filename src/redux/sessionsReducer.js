import { createSlice } from "@reduxjs/toolkit";

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState: {
    sessions: null,
    activeSessionId: "",
  },
  reducers: {
    setSessions: (state, action) => {
      state.sessions = action.payload;
    },
    setActiveSession: (state, action) => {
      state.activeSessionId = action.payload;
    },
    resetSessions: (state) => {
      state.sessions = null;
      state.activeSessionId = "";
    },
  },
});

export const { setSessions, setActiveSession, resetSessions } =
  sessionsSlice.actions;

export default sessionsSlice.reducer;
