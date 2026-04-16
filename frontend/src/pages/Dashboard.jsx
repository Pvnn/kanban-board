import { useContext, useState, useEffect } from "react";
import { LeftNav } from "../components/LeftNav.jsx";
import { StatCard } from "../components/StatCard.jsx";
import { AuthContext } from "../auth/AuthContext.jsx";
import { ActiveTaskCard } from "../components/ActiveTaskCard.jsx";
import { DebtLedger } from "../components/DebtLedger.jsx";
import { timeAgo } from "../utils/date.js";
import axios from "axios";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const currentUserId = user?.id || "current-user-id";
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get('/api/ui/dashboard');
        console.log(data);
        setPayload(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDashboardData();
  }, [])

  if (!payload) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  const uiTasks = payload.tasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    time: timeAgo(task.takenUpAt || task.createdAt),
    assignee: task.assignedToUserId === currentUserId ? "You" : "Assigned"
  }));

  const uiActivity = payload.activity.map((log) => {
    let dotColor = "bg-gray-400";
    if (log.type === "TAKEN_UP") dotColor = "bg-blue-400";
    if (log.type === "STATUS_UPDATED") dotColor = "bg-purple-400";
    if (log.type === "DEBT_CLEARED") dotColor = "bg-green-500";

    const isMe = log.actor.id === currentUserId;
    const actorName = isMe ? "You" : log.actor.name;

    return {
      id: log.id,
      text: `${actorName} ${log.message}`,
      taskName: log.task.title,
      time: timeAgo(log.createdAt),
      colorClass: dotColor
    };
  });

  return (
    <div className="min-h-screen bg-white flex text-gray-900">
      <LeftNav user={user} />

      <main className="px-8 py-10 w-full max-w-7xl mx-auto flex flex-col gap-10">
        <div>
          <h1 className="text-3xl font-bold">
            Hey, {user?.name || "User"}
          </h1>
          <p className="text-gray-500 mt-1">Here's your current status</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="You Owe" value={payload.totalDebt} />
          <StatCard label="Owed To You" value={payload.totalOwed} />
          <StatCard
            label="Net Debt Balance"
            value={payload.netDebt}
            isWarning={payload.netDebt > 0}
          />
          <StatCard label="Active Tasks" value={payload.tasks.length} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Active Tasks */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">Your Active Work</h2>

            <div className="flex flex-col gap-3">
              {uiTasks.length === 0 ? (
                <div className="bg-gray-50 border border-gray-100 border-dashed rounded-xl p-8 text-center text-sm text-gray-500">
                  You have no active tasks right now
                </div>
              ) : (
                uiTasks.map(task => (
                  <ActiveTaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>

          {/* Debt Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold border-b border-gray-200 pb-2">Activity Ledger</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <ul className="space-y-6">
                {uiActivity.length === 0 ? (
                  <div className="text-center text-sm text-gray-400 py-4">
                    No recent activity to show.
                  </div>
                ) : (
                  uiActivity.map((activity, index) => (
                    <DebtLedger key={activity.id} activity={activity} index={index} uiActivity={uiActivity} />
                  ))
                )}
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}