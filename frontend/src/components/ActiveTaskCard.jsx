export const ActiveTaskCard = ({ task }) => {
  return (
    <>
      <div key={task.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-gray-300 hover:shadow-md transition-all cursor-pointer group">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-medium">
            {task.title}
          </h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            {task.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
          {task.description}
        </p>

        <div className="flex items-center text-xs text-gray-400 gap-4">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Taken up {task.time}
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            {task.assignee}
          </span>
        </div>
      </div>
    </>
  )
}