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

export function convertDateToEnglishString(date: Date): string {
  const month = date.toLocaleString("default", { month: "short" });
  const day = addStringToDate(date.getDate());
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

function addStringToDate(day: number) {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}
