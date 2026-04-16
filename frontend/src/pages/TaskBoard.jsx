import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext.jsx";
import { BoardSection } from "../components/BoardSection.jsx";
import { LeftNav } from "../components/LeftNav.jsx";
import axios from "axios";

export const TaskBoard = () => {
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
    <div className="min-h-screen bg-white flex">
      <LeftNav user={user} />
      <main className="flex-1 px-8 py-8 w-full overflow-x-auto h-screen">
        <div className="flex gap-6 items-stretch h-full pb-4">
          <BoardSection title="Todo" color="gray" tasks={todoTasks} plus={true} projects={projects} setTasks={setTasks} user={user} />
          <BoardSection title="Development" color="cyan" tasks={devTasks} projects={projects} setTasks={setTasks} user={user} />
          <BoardSection title="Testing" color="purple" tasks={testTasks} projects={projects} setTasks={setTasks} user={user} />
          <BoardSection title="Done" color="green" tasks={doneTasks} projects={projects} setTasks={setTasks} user={user} />
        </div>
      </main>
    </div>
  );
};
