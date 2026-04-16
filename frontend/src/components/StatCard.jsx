export const StatCard = ({ value, label, isWarning = false }) => {
  const containerBase = "border rounded-xl p-5 shadow-sm";
  const labelBase = "text-sm font-medium mb-1";
  const valueBase = "text-3xl font-semibold";

  const containerClass = isWarning
    ? `${containerBase} bg-orange-50 border-orange-200`
    : `${containerBase} bg-white border-gray-200`;

  const labelClass = isWarning
    ? `${labelBase} text-orange-700`
    : `${labelBase} text-gray-500`;

  const valueClass = isWarning
    ? `${valueBase} text-orange-900`
    : `${valueBase} text-gray-900`;

  return (
    <div className={containerClass}>
      <p className={labelClass}>{label}</p>
      <p className={valueClass}>{value}</p>
    </div>
  );
};