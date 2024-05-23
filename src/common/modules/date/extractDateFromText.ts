export function extractDateFromText(text: string): string {
  const dateStr = text.split(" ").find((word) => isDate(word));
  return dateStr || "";
}

function isDate(word: string) {
  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(word)) return true;
  // YYYY-MM
  if (/^\d{4}-\d{2}$/.test(word)) return true;
  // YYYY
  if (/^\d{4}$/.test(word)) return true;
  // MM-DD
  if (/^\d{2}-\d{2}$/.test(word)) return true;

  return false;
}
