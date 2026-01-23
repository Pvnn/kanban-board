export const TaskCard = ({ title, icon, project, postedBy, postedOn }) => {
  return (
    <div className="h-30 w-71 bg-white p-4 m-3 text-sm grid grid-cols-1 text-gray-800 leading-relaxed">
      <div className="flex gap-1">
        {icon && <div className="text-gray-500">{icon}</div>}
        <div className="font-semibold">{title}</div>
      </div>
      <div className="text-xs">{postedBy}</div>
      <div className="text-xs">{project}</div>
      <div className="text-xs">{postedOn}</div>
    </div>
  );
};
