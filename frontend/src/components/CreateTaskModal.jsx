import { useState } from "react";
import { Icon } from "../ui/Icon.jsx";

const inputClass =
  "w-full rounded-xl bg-white border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-300 focus:ring-0 transition-colors";

export const CreateTaskModal = ({ setOpen, projects = [] }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [newProject, setNewProject] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = () => {
    const payload = {
      title,
      description,
      project: newProject
        ? { projectName, projectDescription }
        : { projectId },
    };

    console.log(payload);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900/50 z-40"
        onClick={() => setOpen(false)}
      />

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg text-gray-800 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-md font-semibold">Create Task</h2>
          <Icon name="X" className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        {/* Task name */}
        <input
          type="text"
          placeholder="Task name"
          className={inputClass}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Task description */}
        <textarea
          rows={3}
          placeholder="Task description"
          className={`${inputClass} resize-none`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* New project checkbox */}
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={newProject}
            onChange={() => setNewProject(!newProject)}
          />
          Create new project
        </label>

        {/* Project selector / creator */}
        {!newProject ? (
          <select
            className={inputClass}
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="">Select project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        ) : (
          <>
            <input
              type="text"
              placeholder="Project name"
              className={inputClass}
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <textarea
              rows={2}
              placeholder="Project description"
              className={`${inputClass} resize-none`}
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-4 py-2 text-sm rounded-xl bg-gray-100 hover:bg-gray-200 transition"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 text-sm rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </>
  );
};
