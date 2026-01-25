import { Icon } from "../ui/Icon.jsx";

export const CreateTaskModal = ({ setOpen }) => {
  return (
    <>
      <div class="fixed inset-0 bg-gray-900/50 z-40"></div>

      <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg  text-gray-800">
        <div className="flex justify-between items-center">
          <h2 class="text-md font-semibold">Create Task</h2>
          <Icon name="X" className="cursor-pointer" onClick={() => { setOpen(false) }}></Icon>
        </div>

        <p class="text-gray-600 mt-2">Modal content goes here.</p>
      </div>

    </>
  )
}