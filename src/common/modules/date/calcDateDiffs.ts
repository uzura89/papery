export function calcDateDiffs(biggerDate: Date, smallerDate: Date): number {
  const diff = biggerDate.getTime() - smallerDate.getTime();
  const day = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / day);
  return days;
}
