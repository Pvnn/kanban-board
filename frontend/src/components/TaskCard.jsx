import { formatDate } from "../utils/date";
import { TaskDetailModal } from "./TaskDetailModal";
import { useState } from "react";

export const TaskCard = ({ task, icon, setTasks }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="h-30 w-71 bg-white p-4 m-3 text-sm grid grid-cols-1 text-gray-800 leading-relaxed cursor-pointer hover:scale-102 transition-all" onClick={() => setIsOpen(true)}>
        <div className="flex gap-1">
          {icon && <div className="text-gray-500">{icon}</div>}
          <div className="font-semibold">{task.title}</div>
        </div>
        <div className="text-xs">{task.createdBy.name}</div>
        <div className="text-xs">{task.project.name}</div>
        <div className="text-xs">{formatDate(task.createdAt)}</div>
      </div>
      {isOpen && (
        <TaskDetailModal setOpen={setIsOpen} task={task} setTasks={setTasks} />
      )}
    </>

  );
};
