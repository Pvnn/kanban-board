import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { BoardSection } from "../components/BoardSection.jsx";
import axios from "axios";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get('/api/task/');
        setTasks(data);
      } catch (err) {
        console.log(err);
      }
    }
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/project/');
        setProjects(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTasks();
    fetchProjects();
  }, [])
  const todoTasks = tasks.filter((task) => task.status == "TODO");
  const devTasks = tasks.filter((task) => task.status == "DEVELOPMENT");
  const testTasks = tasks.filter((task) => task.status == "TESTING");
  const doneTasks = tasks.filter((task) => task.status == "DONE");
  return (
    <div className="min-h-screen px-10 py-8 bg-white">
      <h1>Dashboard for {user.name}</h1>
      <div className="flex justify-between">
        <BoardSection title="Todo" color="gray" tasks={todoTasks} plus={true} projects={projects} setTasks={setTasks} />
        <BoardSection title="Development" color="cyan" tasks={devTasks} projects={projects} setTasks={setTasks} />
        <BoardSection title="Testing" color="purple" tasks={testTasks} projects={projects} setTasks={setTasks} />
        <BoardSection title="Done" color="green" tasks={doneTasks} projects={projects} setTasks={setTasks} />
      </div>
    </div>
  );
};
