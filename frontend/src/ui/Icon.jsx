import * as Icons from "lucide-react";

export const Icon = ({ name, size = 18, ...props }) => {
  const LucideIcon = Icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" does not exist`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      strokeWidth={1.5}
      className="text-gray-600"
      {...props}
    />
  );
};
