export function calcDateDiffs(biggerDate: Date, smallerDate: Date): number {
  const biggerDateWithZeroHour = stripHours(biggerDate);
  const smallerDateWithZeroHour = stripHours(smallerDate);

  const diff =
    biggerDateWithZeroHour.getTime() - smallerDateWithZeroHour.getTime();
  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / day);
  return days;
}

function stripHours(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
