import { useContext } from "react";
import axios from "axios";
import { Icon } from "../ui/Icon";
import { AuthContext } from "../auth/AuthContext";
import { formatDate } from "../utils/date";

export const TaskDetailModal = ({ task, setOpen, setTasks }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/task/${task.id}`);
      setTasks(prev => prev.filter(t => t.id !== task.id));
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTakeup = async () => {
    try {
      const { data: { updatedTask } } =
        await axios.post(`/api/task/takeup/${task.id}`);

      setTasks(prev =>
        prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
      );
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetTest = async () => {
    try {
      const { data: { updatedTask } } =
        await axios.post(`/api/task/setTest/${task.id}`);

      setTasks(prev =>
        prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
      );
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetDone = async () => {
    try {
      const { data: { updatedTask } } =
        await axios.post(`/api/task/setDone/${task.id}`);

      setTasks(prev =>
        prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
      );
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 z-40"
        onClick={() => setOpen(false)}
      />

      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   z-50 w-full max-w-2xl p-7 bg-white rounded-2xl shadow-lg
                   space-y-7"
      >
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold leading-snug">
            {task.title}
          </h2>
          <Icon
            name="X"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide opacity-60">
              Project
            </p>
            <p className="text-sm mt-1">
              {task.project.name}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide opacity-60">
              Description
            </p>
            <p className="text-sm leading-relaxed mt-1">
              {task.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide opacity-60">
              Posted by
            </p>
            <p className="mt-1">{task.createdBy.name}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide opacity-60">
              Posted at
            </p>
            <p className="mt-1">{formatDate(task.createdAt)}</p>
          </div>

          {task.assignedTo && (
            <>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide opacity-60">
                  Taken up by
                </p>
                <p className="mt-1">{task.assignedTo.name}</p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide opacity-60">
                  Taken up at
                </p>
                <p className="mt-1">
                  {formatDate(task.takenUpAt)}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          {task.status !== "DEVELOPMENT" && (
            <button
              className="px-4 py-2 text-sm rounded-xl bg-gray-100
                       hover:bg-gray-200 transition cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          )}


          {task.assignedTo && task.assignedTo.id == user.id && task.createdBy.id !== user.id && task.status === "DEVELOPMENT" && (
            <button
              className="px-4 py-2 text-sm rounded-xl bg-gray-100
                       hover:bg-gray-200 transition cursor-pointer"
              onClick={handleSetTest}
            >
              Move to Test
            </button>
          )}

          {task.assignedTo && task.assignedTo.id == user.id && task.createdBy.id !== user.id && (task.status === "DEVELOPMENT" || task.status === "TESTING") && (
            <button
              className="px-4 py-2 text-sm rounded-xl bg-gray-900
                         text-white hover:bg-gray-800 transition cursor-pointer"
              onClick={handleSetDone}
            >
              Move to Done
            </button>
          )}

          {task.createdBy.id !== user.id && task.status === "TODO" && (
            <button
              className="px-4 py-2 text-sm rounded-xl bg-gray-900
                         text-white hover:bg-gray-800 transition cursor-pointer"
              onClick={handleTakeup}
            >
              Take up
            </button>
          )}

          {task.createdBy.id === user.id && task.status === "TODO" && (
            <button
              className="px-4 py-2 text-sm rounded-xl bg-gray-900
                         text-white hover:bg-gray-800 transition cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </>
  );
};
