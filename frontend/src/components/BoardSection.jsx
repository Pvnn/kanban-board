import { useState } from "react";
import { TaskCard } from "../components/TaskCard";
import { Icon } from "../ui/Icon.jsx";
import { CreateTaskModal } from "./CreateTaskModal.jsx";
import { formatDate } from "../utils/date.js";

export const BoardSection = ({ title, color, tasks, setTasks, plus, projects }) => {
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
      <div className="h-150 w-80 flex flex-col p-3 m-5 items-center">
        <div
          className={`${styles.bg} w-80 py-1 m-5 px-3 rounded-lg flex justify-between items-center`}
        >
          <div className="flex items-center gap-5">
            <div
              className={`${styles.pill} font-semibold py-1 px-2 rounded-full text-sm text-gray-800`}
            >
              {title}
            </div>
            <div className={`${styles.text} text-sm`}>{tasks.length}</div>
          </div>

          {plus && (
            <div className="text text-end">
              <button className="cursor-pointer" onClick={() => setIsCreateTaskModalOpen(true)}>
                <Icon name="Plus" />
              </button>
            </div>
          )}

        </div>

        <div className={`${styles.bg} h-150 w-80 rounded-lg`}>
          {tasks.map((task) => (
            <TaskCard
              key={task.title}
              icon={<Icon name="Palette" />}
              title={task.title}
              postedBy={task.createdBy.name}
              project={task.project.name}
              postedOn={formatDate(task.createdAt)}
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
