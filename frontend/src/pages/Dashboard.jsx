import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { BoardSection } from "../components/BoardSection.jsx";
export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const todoTasks = [
    {
      title: "Create visuals for feature",
      icon: "Palette",
      postedBy: "Ben Lang",
      project: "Ally",
      postedOn: "December 25, 2025",
    },
  ];
  return (
    <div className="min-h-screen px-10 py-8 bg-white">
      <h1>Dashboard for {user.email}</h1>
      <div className="flex justify-between">
        <BoardSection title="Todo" color="gray" tasks={todoTasks} />
        <BoardSection title="Development" color="cyan" tasks={[]} />
        <BoardSection title="Testing" color="purple" tasks={[]} />
        <BoardSection title="Done" color="green" tasks={[]} />
      </div>
    </div>
  );
};
