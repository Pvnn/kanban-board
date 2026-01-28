import { Icon } from "../ui/Icon";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";
import { formatDate } from "../utils/date";
import axios from "axios"

export const TaskDetailModal = ({ task, setOpen, setTasks }) => {
  const { user } = useContext(AuthContext);
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/task/${task.id}`);
      setTasks((prev) => prev.filter((t) => t.id != task.id));
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 z-40"
        onClick={() => setOpen(false)}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg text-gray-800 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-md font-semibold">{task.title}</h2>
          <Icon name="X" className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Description</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {task.description}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Project</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{task.project.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Posted by</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{task.createdBy.name}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Created on</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{formatDate(task.createdAt)}</dd>
            </div>
          </dl>
        </div>


        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-4 py-2 text-sm rounded-xl cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          {task && task.createdBy.id != user.id && task.status === "TODO" && (
            <button
              className="cursor-pointer px-4 py-2 text-sm rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
              onClick={() => console.log("Clicked")}
            >
              Take up
            </button>
          )}
          {task && task.createdBy.id === user.id && (
            <button
              className="cursor-pointer px-4 py-2 text-sm rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}

        </div>
      </div>
    </>
  )
}
