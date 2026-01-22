export const TaskCard = ({ title, icon, project, postedBy, postedOn }) => {
  return (
    <div className="h-30 w-80 bg-white gap-3 p-2 m-3">
      <div className="flex gap-1">
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      <div>{postedBy}</div>
      <div>{project}</div>
      <div>{postedOn}</div>
    </div>
  );
};
