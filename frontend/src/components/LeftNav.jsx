import { Icon } from "../ui/Icon.jsx";

export const LeftNav = () => {
  return (
    <div className="w-50 flex flex-col justify-between bg-gray-100">
      <div className="w-full">
        <div className="text-4xl font-semibold h-20 flex items-center justify-center mt-10">
          TaskB.
        </div>
        <div className="h-30 flex justify-between flex-col my-40 mx-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <Icon name="House"></Icon>
            <span>Dashboard</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Icon name="CircleCheckBig"></Icon>
            <span>Task Board</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Icon name="UserRound"></Icon>
            <span>Profile</span>
          </div>
        </div>
      </div>

      <div className="h-20 mx-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { console.log("Clicked") }}>
          <Icon name="LogOut"></Icon>
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}