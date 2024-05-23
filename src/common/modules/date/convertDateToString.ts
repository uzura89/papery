export function convertDateToString(date: Date): string {
  // YYYY-MM-DD of local time
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${addZero(month)}-${addZero(day)}`;
}

function addZero(num: number) {
  return num < 10 ? "0" + num : num;
}
