export const StatCard = ({ value, label }) => {
  return (
    <div className="bg-slate-100 p-4 rounded-xl shadow-sm flex flex-col justify-between">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-gray-500 text-right">{label}</div>
    </div>
  );
};