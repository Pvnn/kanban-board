import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    authenticated: false,
    user: null,
  });

  const refreshAuth = async () => {
    try {
      const response = await axios.get("/auth/protected");
      const { id, email, name } = response.data;

      setAuth({
        loading: false,
        authenticated: true,
        user: { id, email, name },
      });
    } catch {
      setAuth({
        loading: false,
        authenticated: false,
        user: null,
      });
    }
  };


  useEffect(() => {
    let cancelled = false;

    const checkAuthOnLoad = async () => {
      try {
        const response = await axios.get("/auth/protected");
        const { id, email, name } = response.data;

        if (!cancelled) {
          setAuth({
            loading: false,
            authenticated: true,
            user: { id, email, name },
          });
        }
      } catch {
        if (!cancelled) {
          setAuth({
            loading: false,
            authenticated: false,
            user: null,
          });
        }
      }
    };

    checkAuthOnLoad();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ ...auth, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
