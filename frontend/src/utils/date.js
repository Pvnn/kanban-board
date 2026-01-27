import dayjs from "dayjs";

export function formatDate(date) {
  if (!date) return "";

  return dayjs(date).format("DD MMMM YYYY");
}
