import { useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { Icon } from "../ui/Icon.jsx";
import { CreateTaskModal } from "./CreateTaskModal.jsx";

export const BoardSection = ({ title, color, tasks, setTasks, plus, projects, user }) => {
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const colorStyles = {
    gray: {
      bg: "bg-gray-100/40",
      pill: "bg-gray-200/40",
      text: "text-gray-500/40",
    },
    cyan: {
      bg: "bg-cyan-50/40",
      pill: "bg-cyan-100/60",
      text: "text-cyan-600",
    },
    purple: {
      bg: "bg-purple-50/40",
      pill: "bg-purple-100/60",
      text: "text-purple-600",
    },
    green: {
      bg: "bg-green-50/40",
      pill: "bg-green-100/60",
      text: "text-green-600",
    },
  };

  const styles = colorStyles[color];

  return (
    <>
      <div className="flex flex-col w-75 shrink-0 h-full">
        <div className={`${styles.bg} py-2 px-3 rounded-lg flex justify-between items-center mb-3`}>
          <div className="flex items-center gap-3">
            <div className={`${styles.pill} font-semibold py-1 px-2 rounded-md text-xs text-gray-800`}>
              {title}
            </div>
            <div className={`${styles.text} text-xs font-medium`}>{tasks.length}</div>
          </div>

          {plus && (
            <button className="cursor-pointer hover:bg-gray-200/50 p-1 rounded-md transition-colors" onClick={() => setIsCreateTaskModalOpen(true)}>
              <Icon name="Plus" />
            </button>
          )}
        </div>

        <div className={`${styles.bg} rounded-xl flex-1 p-4 flex flex-col gap-3 overflow-y-auto`}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              icon={<Icon name="Palette" />}
              setTasks={setTasks}
              user={user}
            />
          ))}
        </div>

      </div>
      {
        isCreateTaskModalOpen && (
          <CreateTaskModal setOpen={setIsCreateTaskModalOpen} projects={projects} setTasks={setTasks} />
        )
      }
    </>
  );
};
