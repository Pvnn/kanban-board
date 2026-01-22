import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </div>
  );
};
