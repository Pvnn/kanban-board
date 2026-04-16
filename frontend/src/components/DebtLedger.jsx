export const DebtLedger = ({ activity, uiActivity, index }) => {
  return (
    <li key={activity.id} className="relative flex gap-4">

      {/* Vertical Connecting Line  */}
      {index !== uiActivity.length - 1 && (
        <span className="absolute left-2.5 top-7 -ml-px h-full w-0.5 bg-gray-100" aria-hidden="true"></span>
      )}

      {/* Timeline Node Dot */}
      <div className="relative flex h-5 w-5 flex-none items-center justify-center bg-white mt-0.5">
        <div className={`h-2 w-2 rounded-full ring-4 ring-white ${activity.colorClass}`}></div>
      </div>

      {/* Ledger Text */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-700 leading-snug">
          {activity.text} <br />
          <span className="font-medium text-gray-900">"{activity.taskName}"</span>
        </p>
        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
      </div>
    </li>
  )
}