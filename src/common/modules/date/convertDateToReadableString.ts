export function convertDateToReadableString(date: Date): {
  monthDay: string;
  year: string;
} {
  // Apr 2nd, 2024
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  return { monthDay: `${month} ${day}`, year: `${year}` };
}
