import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { Country, State, City } from "country-state-city";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [db, setDB] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    currentUser.updateEmail(password);
  }

  function getData(uid) {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => setUserData(doc.data()));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) getData(user.uid);
      setDB(firebase.firestore());
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    getData,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    db,
    loading,
    Country,
    State,
    City,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
