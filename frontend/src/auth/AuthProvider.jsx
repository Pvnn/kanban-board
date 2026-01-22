import { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    loading: true,
    authenticated: false,
    user: null,
  });

  // Explicit action: used after login / logout
  const refreshAuth = async () => {
    try {
      const response = await axios.get("/auth/protected");
      const { id, email } = response.data;

      setAuth({
        loading: false,
        authenticated: true,
        user: { id, email },
      });
    } catch {
      setAuth({
        loading: false,
        authenticated: false,
        user: null,
      });
    }
  };

  // Initial auth check (effect owns the async work)
  useEffect(() => {
    let cancelled = false;

    const checkAuthOnLoad = async () => {
      try {
        const response = await axios.get("/auth/protected");
        const { id, email } = response.data;

        if (!cancelled) {
          setAuth({
            loading: false,
            authenticated: true,
            user: { id, email },
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
