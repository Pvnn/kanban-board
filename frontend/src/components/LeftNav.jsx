import { Icon } from "../ui/Icon.jsx";
import { NavLink } from "react-router";
import { AuthContext } from "../auth/AuthContext.jsx";
import { useContext } from "react";
import { useNavigate } from "react-router";

export const LeftNav = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const is_success = await logout();
      if (is_success) {
        navigate("/login", { replace: true });
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("Logout failed due to error", error);
    }

  }
  return (
    <div className="w-50 flex flex-col justify-between bg-gray-100">
      <div className="w-full">
        <div className="text-4xl font-semibold h-20 flex items-center justify-center mt-10">
          TaskB.
        </div>
        <div className="h-30 flex justify-between flex-col my-40 mx-8">
          <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
            <Icon name="House"></Icon>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/tasks" className="flex items-center gap-2 cursor-pointer">
            <Icon name="CircleCheckBig"></Icon>
            <span>Task Board</span>
          </NavLink>
          <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
            <Icon name="UserRound"></Icon>
            <span>Profile</span>
          </NavLink>
        </div>
      </div>

      <div className="h-20 mx-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
          <Icon name="LogOut"></Icon>
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}