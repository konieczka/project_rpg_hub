import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDK419mvpoOi7ytjzTk183ILvC_koykMDQ",
  authDomain: "roleplay-76524.firebaseapp.com",
  projectId: "roleplay-76524",
  storageBucket: "roleplay-76524.appspot.com",
  messagingSenderId: "322850376597",
  appId: "1:322850376597:web:43c4f72a54630ce44e049c",
  measurementId: "G-H2D6CZL2Y6",
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
