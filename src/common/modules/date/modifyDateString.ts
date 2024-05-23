import { convertDateToString } from "./convertDateToString";

export function modifyDateString(date: string, days: number): string {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  const newDateString = convertDateToString(newDate);
  return newDateString;
}

export function modifyDateStringYear(date: string, years: number): string {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  const newDateString = convertDateToString(newDate);
  return newDateString;
}
