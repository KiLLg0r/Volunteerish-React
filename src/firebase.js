import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyB3YHpgOulmWy1KkuPgB3XtfdFu4Q-iDCY",
  authDomain: "volunteerish-ed549.firebaseapp.com",
  projectId: "volunteerish-ed549",
  storageBucket: "volunteerish-ed549.appspot.com",
  messagingSenderId: "970687537120",
  appId: "1:970687537120:web:2d0d2bf109195bbbcc9585",
});

export const auth = app.auth();
export default app;
