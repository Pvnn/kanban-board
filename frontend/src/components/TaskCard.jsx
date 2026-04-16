import { formatDate } from "../utils/date";
import { TaskDetailModal } from "./TaskDetailModal";
import { useState } from "react";

export const TaskCard = ({ task, setTasks, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isCreator = task.createdByUserId === user?.id;
  const isAssignee = task.assignedToUserId === user?.id;

  return (
    <>
      <div
        className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 hover:scale-102 transition-all cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-sm font-medium text-gray-900 leading-snug">
            {task.title}
          </h3>
          {(isCreator || isAssignee) && (
            <span className="shrink-0 text-[10px] font-medium text-gray-400 tracking-wide uppercase">
              {isCreator ? "Your Req" : "Helping"}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="truncate max-w-30">{task.project.name}</span>
            <span>•</span>
            <span>{formatDate(task.createdAt)}</span>
          </div>

          {!isCreator && (
            <div className="text-xs text-gray-400 flex items-center gap-1.5 border-t border-gray-50 pt-2">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              {task.createdBy.name}
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <TaskDetailModal setOpen={setIsOpen} task={task} setTasks={setTasks} user={user} />
      )}
    </>

  );
};
