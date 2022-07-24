const SESSION_RECORD_SCHEMA = {
  isTest: false,
  isTextMessage: false,
  message: "",
  testData: {
    testDescription: "",
    testTemplate: "",
    testSetdown: "",
    testResult: 0,
  },
  author: {
    npc: "",
    pc: "",
  },
  createdAt: "",
  postedByGm: false,
};

export const wrapTestRecord = (testData) => ({
  ...SESSION_RECORD_SCHEMA,
  isTest: true,
  testData,
  createdAt: new Date(Date.now()).toISOString(),
});

export const wrapMessageRecord = (message) => ({
  ...SESSION_RECORD_SCHEMA,
  message,
  createdAt: new Date(Date.now()).toISOString(),
});
