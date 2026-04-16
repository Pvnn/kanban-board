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

  const logout = async () => {
    try {
      const response = await axios.post('/auth/logout');
      if (response.status == 200) {
        setAuth({
          loading: false,
          authenticated: false,
          user: null,
        });
        return true;
      } else {
        return false
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setAuth({ loading: false, authenticated: false, user: null });
        return true;
      }
      console.error("Logout failed:", error);
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ ...auth, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
