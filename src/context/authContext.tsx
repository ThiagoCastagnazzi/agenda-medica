import { auth } from "../firebase/firebase";

import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextProps {
  currentUser: any;
  setCurrentUser: any;
}

const AuthContext = createContext({} as AuthContextProps);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user: any) {
    if (user) {
      setCurrentUser({ ...user });
    } else {
      setCurrentUser(null);
    }

    setLoading(false);
  }

  const value = {
    currentUser,
    setCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
