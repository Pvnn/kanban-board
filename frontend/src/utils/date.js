import dayjs from "dayjs";

export function formatDate(date) {
  if (!date) return "";

  return dayjs(date).format("DD MMMM YYYY");
}

export function timeAgo(date) {
  if (!date) return "N/A";

  const now = dayjs();
  const targetDate = dayjs(date);

  const seconds = now.diff(targetDate, "second");
  const minutes = now.diff(targetDate, "minute");
  const hours = now.diff(targetDate, "hour");
  const days = now.diff(targetDate, "day");

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;

  return formatDate(date);
}
