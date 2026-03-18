import { LeftNav } from "../components/LeftNav.jsx";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext.jsx";
import { StatCard } from "../components/StatCard.jsx";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <LeftNav user={user} />
      <main className="px-7 py-8 w-full max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Hey, {user?.name}
          </h1>
          <p className="text-gray-500">
            Here's your current status
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <StatCard value={6} label="You Owe" />
          <StatCard value={4} label="Owed To You" />
          <StatCard value={3} label="Active Tasks" />
          <StatCard value={5} label="Completed" />
        </div>
      </main>
    </div>
  );
}

