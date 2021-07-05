import React, { useEffect, useState } from "react";
import firebase from "../../config/firebase";

const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const [user, setUesr] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUesr(user);
    });
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
