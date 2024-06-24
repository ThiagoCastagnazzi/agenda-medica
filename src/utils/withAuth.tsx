import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";

const withAuth = (Component: React.ComponentType) => {
  const AuthRoute: React.FC = (props) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setAuthenticated(!!user);
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!authenticated) {
      window.location.href = "/login";
    }

    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;
