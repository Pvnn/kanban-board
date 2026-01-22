import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { TaskCard } from "../components/TaskCard";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen px-10 py-8 bg-white">
      <h1>Dashboard for {user.email}</h1>
      <div className="flex justify-between">
        <div className="h-150 bg-yellow-50 w-90 flex flex-col p-3 m-5  items-center">
          <div>Todo</div>
          <TaskCard
            title="Create visuals for feature"
            postedBy="Ben Lang"
            project="Ally"
            postedOn="December 25, 2025"
          />
        </div>
        <div className="h-150 bg-cyan-50 w-90 flex flex-col p-3 m-5  items-center">
          <div>Development</div>
        </div>
        <div className="h-150 bg-purple-50 w-90 flex flex-col p-3 m-5  items-center">
          <div>Testing</div>
        </div>
        <div className="h-150 bg-green-50 w-90 flex flex-col p-3 m-5  items-center">
          <div>Done</div>
        </div>
      </div>
    </div>
  );
};
