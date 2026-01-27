import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { BoardSection } from "../components/BoardSection.jsx";
import axios from "axios";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('/api/task/');
        setTasks(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTasks();
  }, [])
  const todoTasks = tasks.filter((task) => task.status == "TODO");
  return (
    <div className="min-h-screen px-10 py-8 bg-white">
      <h1>Dashboard for {user.email}</h1>
      <div className="flex justify-between">
        <BoardSection title="Todo" color="gray" tasks={todoTasks} plus={true} />
        <BoardSection title="Development" color="cyan" tasks={[]} />
        <BoardSection title="Testing" color="purple" tasks={[]} />
        <BoardSection title="Done" color="green" tasks={[]} />
      </div>
    </div>
  );
};
