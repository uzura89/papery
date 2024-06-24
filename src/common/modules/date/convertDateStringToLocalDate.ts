export function convertDateStringToLocalDate(dateStr: string) {
  const dateLocal = new Date(
    new Date(dateStr).getTime() + new Date().getTimezoneOffset() * 60000
  );
  return dateLocal;
}
